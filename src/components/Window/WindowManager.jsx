import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";
import { APP_REGISTRY } from "@/components/Apps/registry";
import Window from "@/components/Window/Window";

const WindowManager = () => {
  const constraintsRef = useRef(null);
  const windows = useOsStore((s) => s.windows);

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none fixed inset-x-0 z-10"
      style={{ top: 32, bottom: 96 }}
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
