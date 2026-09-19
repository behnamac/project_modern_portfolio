/**
 * Adapted from Aceternity UI's Floating Dock
 * (https://ui.aceternity.com/components/floating-dock) for this project:
 * plain JS/JSX (no TypeScript, no shadcn CLI/Next.js here), `framer-motion`
 * instead of the `motion` package (we already depend on framer-motion), no
 * `@tabler/icons-react` dependency (the mobile collapse glyph is inlined
 * below), items open OS windows via `onClick` instead of navigating `href`,
 * and the default look is tuned to this app's glassy dock instead of the
 * demo's plain gray/neutral one.
 *
 * Layout note: each icon slot has a FIXED box size (SIZE below) so the
 * dock's own outline never resizes as you hover — only a `scale` transform
 * (which doesn't affect layout/flow) bulges the hovered icon, growing up
 * from the bottom edge like the real macOS dock. Animating width/height
 * directly here would make the whole pill-shaped bar visibly stretch as
 * the mouse moves, which is the "rectangle behind the icons expands" bug.
 *
 * Note: uses position fixed according to your needs — desktop dock is
 * better positioned at the bottom, mobile dock better at bottom right.
 */

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const SIZE = 60; // rest-state icon slot, in px — the dock's box never changes
const PEAK_SCALE = 1.6; // how large the hovered icon grows relative to SIZE

const CollapseGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...props}>
    <path
      d="M5 15l7-7 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md dark:bg-neutral-900"
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md dark:bg-neutral-900"
      >
        <CollapseGlyph className="text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden items-end gap-2 rounded-2xl border border-white/20 bg-white/25 px-3 pt-2 pb-2 shadow-xl backdrop-blur-2xl md:flex dark:border-white/10 dark:bg-black/25",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, onClick, active }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Only `scale` is animated — width/height of the slot stay fixed at SIZE,
  // so the dock's own bounding box never resizes as the mouse moves.
  const scaleTransform = useTransform(distance, [-160, 0, 160], [1, PEAK_SCALE, 1]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center" style={{ width: SIZE }}>
      <motion.button
        ref={ref}
        style={{ width: SIZE, height: SIZE, scale, transformOrigin: "bottom" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className="relative z-0 flex items-center justify-center rounded-xl hover:z-10 active:brightness-90"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-black/10 bg-black/80 px-2 py-0.5 text-xs whitespace-pre text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex h-[70%] w-[70%] items-center justify-center">{icon}</div>
      </motion.button>
      <span
        className={cn(
          "pointer-events-none mt-0.5 h-1 w-1 rounded-full bg-black/60 dark:bg-white/70",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
