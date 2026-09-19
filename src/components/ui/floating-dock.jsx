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
        "mx-auto hidden h-16 items-end gap-2 rounded-2xl border border-white/20 bg-white/25 px-3 pb-2.5 shadow-xl backdrop-blur-2xl md:flex dark:border-white/10 dark:bg-black/25",
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

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [24, 38, 24]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [24, 38, 24]);

  const springOpts = { mass: 0.1, stiffness: 150, damping: 12 };
  const width = useSpring(widthTransform, springOpts);
  const height = useSpring(heightTransform, springOpts);
  const widthIcon = useSpring(widthTransformIcon, springOpts);
  const heightIcon = useSpring(heightTransformIcon, springOpts);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        whileTap={{ scale: 0.9 }}
        className="relative flex aspect-square items-center justify-center rounded-xl"
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
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
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
