import { useRef } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { SPRING } from "../metrics";
import { requestHome } from "./history";
import { useEdgeSwipe } from "./useEdgeSwipe";

// Swipe up from the bottom edge to close the open app.
//
// The grab surface is the home-indicator row, which the three-row shell
// already keeps clear of the tab bar — so this can never eat a tab tap, and
// it never sits over scrollable content either.
//
// Lives here rather than in AppLayer because two elements start the same
// gesture: the indicator button, which is a sibling of the app panel, and the
// safe-area strip that stands in for it on a device that draws its own.

// TRAVEL is both the distance that fully shrinks the card AND the distance
// past which a release dismisses, deliberately: the card reaching its small
// size is then exactly the signal that letting go will go home.
const TRAVEL = 0.18; // fraction of the screen height
const MIN_SCALE = 0.82;
const CARD_RADIUS = 40;
const FOLLOW = 0.7; // the card trails the finger rather than matching it
const SLOP = 8; // px of movement past which the release is a drag, not a tap

const clamp01 = (n) => Math.min(1, Math.max(0, n));

export const useHomeGesture = ({ enabled, reduceMotion }) => {
  const dragY = useMotionValue(0); // negative = dragged up
  const moved = useRef(false);

  // Per evaluation, not snapshotted at render, so rotation is handled and a
  // zero height can never produce a NaN.
  const viewportHeight = () =>
    (typeof window !== "undefined" && window.innerHeight) || 780;

  const progress = useTransform(dragY, (v) =>
    clamp01(-v / (viewportHeight() * TRAVEL))
  );

  // Lift, easing asymptotically onto a ceiling rather than clamping hard, so
  // dragging on past the commit point still feels connected to the finger
  // instead of dead.
  const y = useTransform(dragY, (v) => {
    if (reduceMotion) return 0;
    const limit = viewportHeight() * TRAVEL * FOLLOW;
    return -limit * (1 - Math.exp((Math.min(0, v) * FOLLOW) / limit));
  });
  const scale = useTransform(progress, (p) =>
    reduceMotion ? 1 : 1 - (1 - MIN_SCALE) * p
  );
  const borderRadius = useTransform(progress, (p) =>
    reduceMotion ? 0 : CARD_RADIUS * p
  );

  // Cancelling springs the card back; committing does NOT. On commit the card
  // has to keep shrinking into its icon, and springing it back to full size
  // under AppLayer's exit zoom would cancel that out into a standstill. It is
  // left where the finger dropped it and reset once the exit has finished.
  const reset = () => dragY.set(0);

  const swipe = useEdgeSwipe({
    axis: "y",
    threshold: TRAVEL, // a dismiss is a shorter move than a swipe-back
    onMove: (d) => {
      if (Math.abs(d) > SLOP) moved.current = true;
      dragY.set(Math.min(0, d));
    },
    onCommit: requestHome,
    onCancel: () => {
      if (reduceMotion) reset();
      else animate(dragY, 0, SPRING.snappy);
    },
  });

  // The indicator is both a button and the grab handle, so a finished drag
  // would otherwise fire its onClick too (same problem, same fix, as the
  // draggable Finder icons).
  const onClickCapture = (e) => {
    if (!moved.current) return;
    moved.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const handlers = enabled
    ? {
        ...swipe,
        onPointerDown: (e) => {
          moved.current = false;
          swipe.onPointerDown(e);
        },
        onClickCapture,
      }
    : {};

  return { progress, panel: { y, scale, borderRadius }, handlers, reset };
};
