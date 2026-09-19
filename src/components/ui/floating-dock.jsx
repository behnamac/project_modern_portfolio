/**
 * Aceternity UI — Floating Dock
 * (https://ui.aceternity.com/components/floating-dock)
 *
 * Kept faithful to the published component: same structure (FloatingDock →
 * FloatingDockDesktop / FloatingDockMobile / IconContainer), and the same
 * magnification "settings" — distance range [-150, 0, 150] driving a slot that
 * peaks at 80px, each value fed through a spring of
 * { mass: 0.1, stiffness: 150, damping: 12 }.
 *
 * Sizing is tuned for a macOS dock rather than the demo's nav bar: the slot
 * rests at 48px (not 40px) and the icon fills its slot instead of sitting at
 * half that size, so no empty rounded box is ever visible around the artwork;
 * the gap is 6px (not gap-4) so the icons read as one dock. The bar keeps a
 * fixed h-16 box — a magnified icon rises out of the top of it the way the
 * real dock does, instead of making the glass panel itself taller.
 *
 * Only what this project cannot take verbatim was changed:
 *   - plain JSX instead of TypeScript (no TS in this repo),
 *   - `framer-motion` instead of `motion/react` (already a dependency here),
 *   - the collapse glyph is inlined rather than pulled from
 *     `@tabler/icons-react` (the app ships its own icon set),
 *   - items fire `onClick` to open an OS window instead of navigating `href`,
 *     and carry an `active` flag for the running-app dot under the icon,
 *   - the bar and the icon slots wear this app's glass look; the official
 *     gray icon plate is dropped because the dock icons are full-bleed macOS
 *     app artwork that would show gray corners on top of it.
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

const SLOT_REST = 48; // icon slot at rest, in px
const SLOT_PEAK = 80; // icon slot directly under the cursor

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
        "mx-auto hidden h-16 items-end gap-1.5 overflow-visible rounded-2xl border border-white/20 bg-white/25 px-2 pb-1.5 shadow-xl backdrop-blur-2xl md:flex dark:border-white/10 dark:bg-black/25",
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

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Same shape as the published component ([-150, 0, 150] → rest, peak, rest),
  // resized for a macOS dock: the slot rests at 48px instead of 40px and the
  // icon fills its slot rather than sitting at half its size, so there is no
  // empty box around the artwork at any point of the animation.
  const widthTransform = useTransform(distance, [-150, 0, 150], [SLOT_REST, SLOT_PEAK, SLOT_REST]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [SLOT_REST, SLOT_PEAK, SLOT_REST]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [SLOT_REST, SLOT_PEAK, SLOT_REST]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [SLOT_REST, SLOT_PEAK, SLOT_REST]);

  const springOpts = { mass: 0.1, stiffness: 150, damping: 12 };
  const width = useSpring(widthTransform, springOpts);
  const height = useSpring(heightTransform, springOpts);
  const widthIcon = useSpring(widthTransformIcon, springOpts);
  const heightIcon = useSpring(heightTransformIcon, springOpts);

  const [hovered, setHovered] = useState(false);

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
        className="relative flex aspect-square items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
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
