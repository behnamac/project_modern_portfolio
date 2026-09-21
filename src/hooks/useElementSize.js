import { useLayoutEffect, useRef, useState } from "react";

// Measures an element and keeps up with its resizes. The Finder icon canvas
// needs this because Window's simulated fullscreen animates left/top/width/
// height over 320ms, so the pane genuinely changes size at runtime and the
// icon layout has to follow it.
export const useElementSize = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      const { width, height } = element.getBoundingClientRect();
      // ResizeObserver fires on every frame of the fullscreen transition, so
      // bail out when nothing actually changed to avoid pointless renders.
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
};
