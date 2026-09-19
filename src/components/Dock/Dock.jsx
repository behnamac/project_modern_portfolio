import { useMotionValue } from "framer-motion";
import { DOCK_APPS } from "@/constants";
import { APP_REGISTRY } from "@/components/Apps/registry";
import { useOsStore } from "@/store/useOsStore";
import DockIcon from "@/components/Dock/DockIcon";

const Dock = () => {
  const mouseX = useMotionValue(null);
  const windows = useOsStore((s) => s.windows);
  const openWindow = useOsStore((s) => s.openWindow);

  const launch = (appId) => {
    const def = APP_REGISTRY[appId];
    openWindow({ id: appId, app: appId, title: def.title, size: def.size });
  };

  return (
    <div className="fixed inset-x-0 bottom-3 z-[999] flex justify-center">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(null)}
        className="flex items-end gap-2 rounded-2xl border border-white/20 bg-white/25 px-3 py-2 shadow-xl backdrop-blur-2xl dark:bg-black/25"
      >
        {DOCK_APPS.map((app) => {
          const def = APP_REGISTRY[app.id];
          const isOpen = windows.some((w) => w.id === app.id);
          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              label={app.name}
              active={isOpen}
              onClick={() => launch(app.id)}
            >
              {def.dockIcon}
            </DockIcon>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
