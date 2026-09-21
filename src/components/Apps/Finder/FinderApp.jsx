import { useState } from "react";
import { PROJECTS } from "@/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FolderIcon } from "@/components/icons";
import FinderSidebar from "./FinderSidebar";
import FinderToolbar from "./FinderToolbar";
import IconCanvas from "./IconCanvas";
import ProjectDetail from "./ProjectDetail";

const FOLDER_VIEW = { kind: "folder", projectId: null };
const projectView = (projectId) => ({ kind: "project", projectId });

// The "Work" folder. Holds the selection plus a small browser-style history
// stack so the toolbar chevrons actually mean something: opening a folder
// pushes a project view, Back returns to the icon canvas, Forward re-opens it.
const FinderApp = ({ initialProjectId }) => {
  const isMobile = useIsMobile();
  const [selectedId, setSelectedId] = useState(initialProjectId || null);
  // Opened from a desktop folder, we seed two entries so Back lands on Work.
  const [nav, setNav] = useState(() =>
    initialProjectId
      ? { stack: [FOLDER_VIEW, projectView(initialProjectId)], index: 1 }
      : { stack: [FOLDER_VIEW], index: 0 }
  );

  const view = nav.stack[nav.index];
  const project = PROJECTS.find((p) => p.id === view.projectId);

  const navigate = (next) =>
    setNav((n) => {
      const current = n.stack[n.index];
      if (current.kind === next.kind && current.projectId === next.projectId) return n;
      // Navigating from the middle of the stack drops the forward entries,
      // exactly like a browser.
      const stack = [...n.stack.slice(0, n.index + 1), next];
      return { stack, index: stack.length - 1 };
    });

  const showFolder = () => {
    setSelectedId(null);
    navigate(FOLDER_VIEW);
  };

  const revealProject = (id) => {
    setSelectedId(id);
    navigate(FOLDER_VIEW);
  };

  const openProject = (id) => {
    setSelectedId(id);
    navigate(projectView(id));
  };

  return (
    <div className="flex h-full select-none text-sm">
      {/* The 208px sidebar would eat most of a phone viewport. */}
      {!isMobile && (
        <FinderSidebar
          inFolderView={view.kind === "folder"}
          selectedId={selectedId}
          onShowFolder={showFolder}
          onRevealProject={revealProject}
          onOpenProject={openProject}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <FinderToolbar
          title={view.kind === "folder" ? "Work" : project?.folder || "Work"}
          icon={<FolderIcon />}
          canBack={nav.index > 0}
          canForward={nav.index < nav.stack.length - 1}
          onBack={() => setNav((n) => (n.index > 0 ? { ...n, index: n.index - 1 } : n))}
          onForward={() =>
            setNav((n) =>
              n.index < n.stack.length - 1 ? { ...n, index: n.index + 1 } : n
            )
          }
        />

        {view.kind === "folder" ? (
          <IconCanvas
            selectedId={selectedId}
            onSelect={setSelectedId}
            onOpen={openProject}
            floating={!isMobile}
          />
        ) : (
          <ProjectDetail project={project} />
        )}
      </div>
    </div>
  );
};

export default FinderApp;
