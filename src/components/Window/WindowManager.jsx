import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";
import { APP_REGISTRY } from "@/components/Apps/registry";
import Window from "@/components/Window/Window";
import { MENUBAR_HEIGHT, DOCK_RESERVE } from "@/constants";

const WindowManager = () => {
  const constraintsRef = useRef(null);
  const windows = useOsStore((s) => s.windows);
  // The desk's own z-index makes a stacking context, so a window's zIndex can
  // never beat the dock (999) or menu bar (1000) from in here. Lift the whole
  // desk while something is fullscreen so it really does cover the chrome.
  const anyFullscreen = windows.some((w) => w.fullscreen && !w.minimized);

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none fixed inset-x-0"
      style={{
        top: MENUBAR_HEIGHT,
        bottom: DOCK_RESERVE,
        zIndex: anyFullscreen ? 1001 : 10,
      }}
    >
      <AnimatePresence>
        {windows.map((w) => {
          const def = APP_REGISTRY[w.app];
          if (!def) return null;
          const Content = def.component;
          return (
            <Window
              key={w.id}
              id={w.id}
              title={w.title || def.title}
              icon={def.icon}
              size={def.size}
              constraintsRef={constraintsRef}
            >
              <Content {...w.props} />
            </Window>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
