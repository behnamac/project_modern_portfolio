import { PROJECTS } from "@/constants";
import { FolderIcon } from "@/components/icons";
import { useOsStore } from "@/store/useOsStore";
import { APP_REGISTRY } from "@/components/Apps/registry";

// "Work" navigates inside Finder; the other three are real apps, so they open
// their own windows the way DesktopIcons does. Rendering Notes or the résumé
// inside the Finder pane would duplicate the window manager's job and make the
// title bar and the back/forward chevrons ambiguous.
const FAVORITES = [
  { id: "work", label: "Work", src: "/icons/work.svg" },
  { id: "notes", label: "About me", src: "/icons/user.svg" },
  { id: "resume", label: "Resume", src: "/icons/file.svg" },
  { id: "trash", label: "Trash", src: "/icons/trash.svg" },
];

const SECTION =
  "mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-black/40 dark:text-white/40";
const ROW = "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition";
const ROW_ON = "bg-blue-500 text-white";
const ROW_OFF = "hover:bg-black/5 dark:hover:bg-white/10";

const FinderSidebar = ({
  inFolderView,
  selectedId,
  onShowFolder,
  onRevealProject,
  onOpenProject,
}) => {
  const openWindow = useOsStore((s) => s.openWindow);

  const openApp = (appId) => {
    const def = APP_REGISTRY[appId];
    openWindow({ id: appId, app: appId, title: def.title, size: def.size });
  };

  return (
    <aside className="mac-scroll w-52 shrink-0 overflow-auto border-r border-black/10 bg-black/[0.03] p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <p className={SECTION}>Favorites</p>
      <ul className="mb-4 space-y-0.5">
        {FAVORITES.map((favorite) => (
          <li key={favorite.id}>
            <button
              onClick={() =>
                favorite.id === "work" ? onShowFolder() : openApp(favorite.id)
              }
              className={`${ROW} ${
                favorite.id === "work" && inFolderView ? ROW_ON : ROW_OFF
              }`}
            >
              <img
                src={favorite.src}
                alt=""
                className="h-4 w-4 shrink-0 opacity-70 dark:invert"
              />
              <span className="truncate">{favorite.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className={SECTION}>Work</p>
      <ul className="space-y-0.5">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => onRevealProject(project.id)}
              onDoubleClick={() => onOpenProject(project.id)}
              className={`${ROW} ${selectedId === project.id ? ROW_ON : ROW_OFF}`}
            >
              <span className="h-4 w-4 shrink-0">
                <FolderIcon />
              </span>
              <span className="truncate">{project.folder}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FinderSidebar;
