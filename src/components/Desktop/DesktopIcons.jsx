import { useState } from "react";
import { PROJECTS } from "@/constants";
import { FolderIcon, PdfIcon } from "@/components/icons";
import { useOsStore } from "@/store/useOsStore";
import { APP_REGISTRY } from "@/components/Apps/registry";

const DesktopIcon = ({ icon, label, onOpen, selected, onSelect }) => (
  <button
    onClick={onSelect}
    onDoubleClick={onOpen}
    className={`flex w-24 flex-col items-center gap-1 rounded-lg p-2 text-center ${
      selected ? "bg-white/20" : "hover:bg-white/10"
    }`}
  >
    <span className="h-12 w-12 drop-shadow-lg">{icon}</span>
    <span className="rounded px-1 text-[11px] font-medium text-white drop-shadow-sm">
      {label}
    </span>
  </button>
);

const DesktopIcons = () => {
  const [selected, setSelected] = useState(null);
  const openWindow = useOsStore((s) => s.openWindow);

  const openApp = (appId) => {
    const def = APP_REGISTRY[appId];
    openWindow({ id: appId, app: appId, title: def.title, size: def.size });
  };

  const openProject = (projectId) => {
    const def = APP_REGISTRY.finder;
    openWindow({
      id: "finder",
      app: "finder",
      title: def.title,
      size: def.size,
      props: { initialProjectId: projectId },
    });
  };

  return (
    <div className="fixed inset-0 top-8 z-0 select-none">
      <div className="absolute left-6 top-6">
        <DesktopIcon
          icon={<PdfIcon />}
          label="Resume.pdf"
          selected={selected === "resume"}
          onSelect={() => setSelected("resume")}
          onOpen={() => openApp("resume")}
        />
      </div>
      <div className="absolute right-4 top-6 flex flex-col gap-2">
        {PROJECTS.map((p) => (
          <DesktopIcon
            key={p.id}
            icon={<FolderIcon />}
            label={p.folder}
            selected={selected === p.id}
            onSelect={() => setSelected(p.id)}
            onOpen={() => openProject(p.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopIcons;
