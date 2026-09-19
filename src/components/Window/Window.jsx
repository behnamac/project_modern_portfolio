import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";

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

  if (!win || win.minimized) return null;

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      style={{
        x: dragX,
        y: dragY,
        left: win.position.x,
        top: win.position.y,
        width: win.size?.width || size?.width || 640,
        height: win.size?.height || size?.height || 460,
        zIndex: win.zIndex,
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
      className="pointer-events-auto absolute flex flex-col overflow-hidden rounded-xl border border-black/10 shadow-2xl shadow-black/40 bg-white/90 dark:bg-[#1e1e22]/95 dark:border-white/10 backdrop-blur-xl"
    >
      <TitleBar
        title={title}
        icon={icon}
        onClose={() => closeWindow(id)}
        onMinimize={() => minimizeWindow(id)}
        onStartDrag={(e) => dragControls.start(e)}
      />
      <div className="mac-scroll flex-1 overflow-auto bg-white/70 dark:bg-[#1c1c1f]/90 text-[#1d1d1f] dark:text-[#f2f2f3]">
        {children}
      </div>
    </motion.div>
  );
};

const TitleBar = ({ title, icon, onClose, onMinimize, onStartDrag }) => (
  <div
    onPointerDown={onStartDrag}
    className="relative flex h-9 shrink-0 select-none items-center justify-center gap-2 border-b border-black/10 bg-[#e7e7e9]/90 px-3 dark:border-white/10 dark:bg-[#2b2b2f]/90 cursor-grab active:cursor-grabbing touch-none"
  >
    <div className="absolute left-3 flex items-center gap-2">
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClose}
        className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 hover:brightness-90"
        aria-label="Close"
      />
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onMinimize}
        className="h-3 w-3 rounded-full bg-[#ffbd2e] ring-1 ring-black/10 hover:brightness-90"
        aria-label="Minimize"
      />
      <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10 opacity-60" />
    </div>
    <div className="flex items-center gap-1.5 text-xs font-medium text-[#1d1d1f]/70 dark:text-white/70">
      {icon && <span className="h-3.5 w-3.5">{icon}</span>}
      <span>{title}</span>
    </div>
  </div>
);

export default Window;
