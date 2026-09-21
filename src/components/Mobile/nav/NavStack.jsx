import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { MOBILE_APPS } from "../registry";
import { SCREEN_VARIANTS, SPRING } from "../metrics";
import { requestBack } from "./history";
import { useEdgeSwipe } from "./useEdgeSwipe";

// Renders the top of the current stack, plus the screen beneath it — the one
// you see sliding away on a push, or peeking out during a swipe-back.
//
// framer-motion 10 specifics that shape this:
//  - AnimatePresence has no `propagate`, so nothing nested here may own the
//    app's own exit animation; AppLayer does.
//  - `custom` only reaches EXITING children, so the direction is set on each
//    entering motion.div too, or a pop animates the wrong way.
//  - mode="popLayout" absolutely-positions clones, which fights fixed
//    full-screen layers; the default sync mode plus our own inset-0 is right.
//
// The push/pop variants and the swipe gesture drive SEPARATE elements on
// purpose: both want to write `x`, and sharing one would let the variant
// animation overwrite the gesture's MotionValue with a percentage string.
const NavStack = ({ appId, entries, tabs, bottomInset, reduceMotion }) => {
  const direction = useMobileStore((s) => s.direction);
  const app = MOBILE_APPS[appId];

  const dragX = useMotionValue(0);

  // Read the viewport per evaluation rather than snapshotting it at render,
  // so rotation is handled and a zero width can never produce a NaN.
  const viewportWidth = () =>
    (typeof window !== "undefined" && window.innerWidth) || 390;

  const progress = (v) => {
    const n = typeof v === "number" ? v : parseFloat(v) || 0;
    return Math.min(1, Math.max(0, n / viewportWidth()));
  };

  const underX = useTransform(dragX, (v) => -0.3 * viewportWidth() * (1 - progress(v)));
  const underDim = useTransform(dragX, (v) => 0.1 * (1 - progress(v)));

  // Live at every depth: at depth 1 `back()` leaves the app, so this is also
  // the gesture that returns to the home screen.
  const swipe = useEdgeSwipe({
    axis: "x",
    onMove: (d) => dragX.set(Math.max(0, d)),
    onCommit: () => {
      animate(dragX, viewportWidth(), {
        ...SPRING.nav,
        onComplete: () => dragX.set(0),
      });
      requestBack();
    },
    onCancel: () => animate(dragX, 0, SPRING.nav),
  });

  const visible = entries.slice(-2);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {visible.map((entry, i) => {
          const isTop = i === visible.length - 1;
          const Component = app.screens[entry.screen];
          if (!Component) return null;

          const previous = entries[entries.length - 2];
          const back =
            isTop && entries.length > 1
              ? { label: previous ? titleFor(app, previous) : "Back", onPress: requestBack }
              : null;

          return (
            <motion.div
              key={entry.key}
              custom={direction}
              variants={reduceMotion ? undefined : SCREEN_VARIANTS}
              initial={isTop ? "enter" : false}
              animate="center"
              exit="exit"
              transition={reduceMotion ? { duration: 0 } : SPRING.nav}
              className="absolute inset-0"
              style={{
                zIndex: isTop ? 2 : 1,
                boxShadow:
                  isTop && visible.length > 1 ? "-8px 0 24px rgba(0,0,0,0.18)" : undefined,
              }}
            >
              {/* Gesture layer: composes with the variant transform above. */}
              <motion.div
                className="h-full w-full"
                style={{ x: isTop ? dragX : visible.length > 1 ? underX : undefined }}
              >
                <Component
                  {...entry.params}
                  back={back}
                  tabs={tabs}
                  bottomInset={bottomInset}
                />

                {/* The screen underneath dims. An opacity-animated overlay is
                    compositor-only; filter: brightness() would repaint the
                    whole layer every frame on mobile GPUs. */}
                {!isTop && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-black"
                    style={{ opacity: underDim }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div
        {...swipe}
        className="absolute inset-y-0 left-0 z-10 w-5 touch-none"
        aria-hidden="true"
      />
    </div>
  );
};

// The back button names where you came FROM, the way iOS does.
const titleFor = (app, entry) => {
  const tab = (app.tabs || []).find((t) => t.root === entry.screen);
  return tab ? tab.label : app.name;
};

export default NavStack;
