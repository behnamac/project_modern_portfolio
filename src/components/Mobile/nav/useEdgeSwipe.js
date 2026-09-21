import { useRef } from "react";

// Pointer-driven edge gesture, used for swipe-back and swipe-up-to-home.
//
// Hand-rolled rather than framer's `drag` because `drag` needs
// touch-action: none across the element it is attached to, and these gestures
// live over content that must still scroll. A narrow strip with its own
// touch-action can never steal a content scroll.
export const useEdgeSwipe = ({ axis = "x", onMove, onCommit, onCancel, threshold = 0.35 }) => {
  const start = useRef(null);
  const last = useRef({ t: 0, v: 0, d: 0 });

  const distance = (e) =>
    axis === "x" ? e.clientX - start.current.x : e.clientY - start.current.y;

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY };
    last.current = { t: performance.now(), v: 0, d: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!start.current) return;
    const d = distance(e);
    const now = performance.now();
    const dt = now - last.current.t;
    if (dt > 0) last.current.v = ((d - last.current.d) / dt) * 1000;
    last.current.t = now;
    last.current.d = d;
    onMove?.(d);
  };

  const finish = (e) => {
    if (!start.current) return;
    const d = distance(e);
    const span = axis === "x" ? window.innerWidth : window.innerHeight;
    const travelled = axis === "x" ? d : -d;
    const velocity = axis === "x" ? last.current.v : -last.current.v;

    start.current = null;

    if (travelled > span * threshold || velocity > 500) onCommit?.();
    else onCancel?.();
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: finish,
  };
};
