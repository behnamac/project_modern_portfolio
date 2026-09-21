import { useEffect, useState } from "react";

// Measures env(safe-area-inset-*) in JS, which CSS alone cannot report back.
//
// This exists to decide whether to DRAW the simulated status bar and home
// indicator at all: on a real notched iPhone the OS already draws both above
// and below the viewport, so painting our own would show the clock twice.
// A non-zero top inset is the only available signal that this is happening.
export const useSafeArea = () => {
  const [inset, setInset] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;" +
      "height:env(safe-area-inset-top,0px);width:env(safe-area-inset-bottom,0px)";
    document.body.appendChild(probe);
    const style = getComputedStyle(probe);
    setInset({
      top: parseFloat(style.height) || 0,
      bottom: parseFloat(style.width) || 0,
    });
    probe.remove();
  }, []);

  return inset;
};
