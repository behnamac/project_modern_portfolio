import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";
import { MENUBAR_HEIGHT } from "@/constants";

// How long the expand/collapse between windowed and fullscreen takes.
const FULLSCREEN_MS = 320;
const EASE = "cubic-bezier(.2,.8,.2,1)";
const GEOMETRY_TRANSITION = ["left", "top", "width", "height", "border-radius"]
  .map((prop) => `${prop} ${FULLSCREEN_MS}ms ${EASE}`)
  .join(", ");

// Renders one draggable window. Positioning is absolute within the shared
// "desk" container rendered by WindowManager, and z-index is set directly
// on this outer element so stacking/focus order actually works across
// windows (nesting it any deeper would be ignored by sibling windows).
const Window = ({ id, title, icon, children, size, constraintsRef }) => {
  const dragControls = useDragControls();
  // Local, imperative drag offset. Reset to 0 right after each drag ends
  // (once the new absolute position is written to the store) so left/top
  // stay the single source of truth and we never double-count an old
  // drag offset on the next drag.
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const win = useOsStore((s) => s.windows.find((w) => w.id === id));
  const closeWindow = useOsStore((s) => s.closeWindow);
  const minimizeWindow = useOsStore((s) => s.minimizeWindow);
  const focusWindow = useOsStore((s) => s.focusWindow);
  const moveWindow = useOsStore((s) => s.moveWindow);
  const toggleFullscreen = useOsStore((s) => s.toggleFullscreen);

  const isFull = !!win?.fullscreen;

  // left/top/width/height live in `style` so they apply instantly: a drag ends
  // by writing the new position to the store while x/y snap back to 0, and an
  // animated left/top would make the window visibly slide the distance twice.
  // So the transition is switched on only for the duration of a fullscreen
  // toggle, which is the one time we do want the box to animate.
  const [animating, setAnimating] = useState(false);
  const animateTimer = useRef(null);

  useEffect(() => () => clearTimeout(animateTimer.current), []);

  const toggleFull = useCallback(() => {
    setAnimating(true);
    clearTimeout(animateTimer.current);
    animateTimer.current = setTimeout(
      () => setAnimating(false),
      FULLSCREEN_MS + 40
    );
    toggleFullscreen(id);
  }, [id, toggleFullscreen]);

  // The dock is hidden while fullscreen, so Escape is the escape hatch.
  useEffect(() => {
    if (!isFull) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") toggleFull();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFull, toggleFull]);

  if (!win || win.minimized) return null;

  return (
    <motion.div
      drag={!isFull}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      style={{
        x: dragX,
        y: dragY,
        // The desk is inset by MENUBAR_HEIGHT at the top and inset-x-0, so a
        // child at top:-MENUBAR_HEIGHT / 100% wide / 100vh tall covers the
        // whole viewport without having to switch to position: fixed (which
        // would change the coordinate origin mid-animation).
        left: isFull ? 0 : win.position.x,
        top: isFull ? -MENUBAR_HEIGHT : win.position.y,
        width: isFull ? "100%" : win.size?.width || size?.width || 640,
        height: isFull ? "100vh" : win.size?.height || size?.height || 460,
        borderRadius: isFull ? 0 : 12,
        zIndex: win.zIndex,
        transition: animating ? GEOMETRY_TRANSITION : undefined,
      }}
      onDragEnd={(_, info) => {
        moveWindow(id, {
          x: win.position.x + info.offset.x,
          y: win.position.y + info.offset.y,
        });
        dragX.set(0);
        dragY.set(0);
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      onPointerDownCapture={() => focusWindow(id)}
      className={`pointer-events-auto absolute flex flex-col overflow-hidden bg-white/90 dark:bg-[#1e1e22]/95 backdrop-blur-xl ${
        isFull
          ? ""
          : "border border-black/10 shadow-2xl shadow-black/40 dark:border-white/10"
      }`}
    >
      <TitleBar
        title={title}
        icon={icon}
        isFull={isFull}
        onClose={() => closeWindow(id)}
        onMinimize={() => minimizeWindow(id)}
        onFullscreen={toggleFull}
        onStartDrag={(e) => {
          if (!isFull) dragControls.start(e);
        }}
      />
      <div className="mac-scroll flex-1 overflow-auto bg-white/70 dark:bg-[#1c1c1f]/90 text-[#1d1d1f] dark:text-[#f2f2f3]">
        {children}
      </div>
    </motion.div>
  );
};

// Glyphs are drawn in a 12x12 box so they line up with the 12px (h-3 w-3)
// buttons without any scaling blur.
const CLOSE_GLYPH = (
  <path d="M3.9 3.9 8.1 8.1 M8.1 3.9 3.9 8.1" strokeWidth="1.4" />
);

const MINIMIZE_GLYPH = <path d="M3.1 6 H8.9" strokeWidth="1.4" />;

// Two triangles split by a diagonal gap running bottom-left to top-right.
const ZOOM_GLYPH = (
  <path
    d="M3.2 3.2 H7.1 L3.2 7.1 Z M8.8 8.8 H4.9 L8.8 4.9 Z"
    strokeWidth="0.6"
    fill="currentColor"
    strokeLinejoin="round"
  />
);

// Same two triangles, flipped to point inward — shown while fullscreen.
const EXIT_FULLSCREEN_GLYPH = (
  <path
    d="M7.4 1.8 V4.6 H4.6 Z M4.6 10.2 V7.4 H7.4 Z"
    strokeWidth="0.6"
    fill="currentColor"
    strokeLinejoin="round"
  />
);

// A macOS traffic-light button: a flat dot that reveals its glyph while the
// pointer is anywhere over the cluster. Without an onClick it renders as an
// inert, dimmed dot (the placeholder state) instead of a button.
const TrafficLight = ({ label, color, glyphColor, glyph, onClick }) => {
  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      {...(onClick
        ? {
            onClick,
            onPointerDown: (e) => e.stopPropagation(),
            onDoubleClick: (e) => e.stopPropagation(),
            "aria-label": label,
          }
        : { "aria-hidden": true })}
      style={{ backgroundColor: color, color: glyphColor }}
      className={`flex h-3 w-3 items-center justify-center rounded-full ring-1 ring-black/10 transition-[filter] ${
        onClick ? "hover:brightness-95" : "opacity-60"
      }`}
    >
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        {glyph}
      </svg>
    </Tag>
  );
};

const TitleBar = ({
  title,
  icon,
  isFull,
  onClose,
  onMinimize,
  onFullscreen,
  onStartDrag,
}) => (
  <div
    onPointerDown={onStartDrag}
    onDoubleClick={onFullscreen}
    className={`relative flex h-9 shrink-0 select-none items-center justify-center gap-2 border-b border-black/10 bg-[#e7e7e9]/90 px-3 dark:border-white/10 dark:bg-[#2b2b2f]/90 touch-none ${
      isFull ? "cursor-default" : "cursor-grab active:cursor-grabbing"
    }`}
  >
    {/* `group` so that hovering anywhere over the cluster reveals all three
        glyphs at once, the way macOS does it. */}
    <div className="group absolute left-3 flex items-center gap-2">
      <TrafficLight
        label="Close"
        color="#ff5f57"
        glyphColor="#7d0000"
        glyph={CLOSE_GLYPH}
        onClick={onClose}
      />
      <TrafficLight
        label="Minimize"
        color="#ffbd2e"
        glyphColor="#9a5f00"
        glyph={MINIMIZE_GLYPH}
        onClick={onMinimize}
      />
      <TrafficLight
        label={isFull ? "Exit full screen" : "Enter full screen"}
        color="#28c840"
        glyphColor="#006200"
        glyph={isFull ? EXIT_FULLSCREEN_GLYPH : ZOOM_GLYPH}
        onClick={onFullscreen}
      />
    </div>
    <div className="flex items-center gap-1.5 text-xs font-medium text-[#1d1d1f]/70 dark:text-white/70">
      {icon && <span className="h-3.5 w-3.5">{icon}</span>}
      <span>{title}</span>
    </div>
  </div>
);

export default Window;
