import { DOCK_APPS } from "@/constants";
import { APP_REGISTRY } from "@/components/Apps/registry";
import { useOsStore } from "@/store/useOsStore";
import { FloatingDock } from "@/components/ui/floating-dock";

const Dock = () => {
  const windows = useOsStore((s) => s.windows);
  const openWindow = useOsStore((s) => s.openWindow);
  // Slides out of the way while a window is in (simulated) fullscreen.
  const hidden = windows.some((w) => w.fullscreen && !w.minimized);

  const launch = (appId) => {
    const def = APP_REGISTRY[appId];
    openWindow({ id: appId, app: appId, title: def.title, size: def.size });
  };

  const items = DOCK_APPS.map((app) => {
    const def = APP_REGISTRY[app.id];
    return {
      title: app.name,
      icon: def.dockIcon,
      onClick: () => launch(app.id),
      active: windows.some((w) => w.id === app.id),
    };
  });

  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-[999] flex justify-center transition duration-300 ease-out ${
        hidden ? "pointer-events-none translate-y-32 opacity-0" : ""
      }`}
    >
      <FloatingDock items={items} />
    </div>
  );
};

export default Dock;
