import { useEffect, useMemo, useState } from "react";
import { PROJECTS } from "@/constants";
import { useElementSize } from "@/hooks/useElementSize";
import { useFinderLayoutStore } from "@/store/useFinderLayoutStore";
import { clampPosition, defaultLayout } from "./layout";
import ProjectFolderIcon from "./ProjectFolderIcon";

const MENU_W = 168;
const MENU_H = 76;

const MENU_ITEM =
  "block w-full px-3 py-1.5 text-left transition hover:bg-blue-500 hover:text-white";

const CanvasContextMenu = ({ x, y, width, height, onClose, onCleanUp, onReset }) => (
  <>
    {/* Click-away catcher. It sits UNDER the menu (z-40 vs z-50) so a
        pointerdown on a menu item never reaches it and the click still fires. */}
    <div
      className="absolute inset-0 z-40"
      onPointerDown={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
    />
    <div
      role="menu"
      aria-label="Folder actions"
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        left: Math.min(x, Math.max(0, width - MENU_W)),
        top: Math.min(y, Math.max(0, height - MENU_H)),
        width: MENU_W,
      }}
      className="absolute z-50 overflow-hidden rounded-lg border border-black/10 bg-white/95 py-1 text-xs shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#2b2b2f]/95"
    >
      <button
        role="menuitem"
        className={MENU_ITEM}
        onClick={() => {
          onCleanUp();
          onClose();
        }}
      >
        Clean Up
      </button>
      <button
        role="menuitem"
        className={MENU_ITEM}
        onClick={() => {
          onReset();
          onClose();
        }}
      >
        Reset Layout
      </button>
    </div>
  </>
);

// The free-form icon view. Owns pane measurement, the layout merge, selection
// clearing and the context menu.
const IconCanvas = ({ selectedId, onSelect, onOpen, floating = true }) => {
  const [paneRef, { width, height }] = useElementSize();
  const positions = useFinderLayoutStore((s) => s.positions);
  const setPosition = useFinderLayoutStore((s) => s.setPosition);
  const setPositions = useFinderLayoutStore((s) => s.setPositions);
  const resetPositions = useFinderLayoutStore((s) => s.resetPositions);
  const [menu, setMenu] = useState(null); // { x, y } in pane coordinates

  // Defaults for untouched icons + stored overrides for dragged ones, all
  // clamped to the CURRENT pane. The clamp is render-only and is never written
  // back, so shrinking the window (or leaving fullscreen) does not destroy an
  // arrangement — the icons return to their exact spots when it grows again.
  const layout = useMemo(() => {
    if (!width || !height) return null;
    const base = defaultLayout(width, height);
    return PROJECTS.reduce((acc, project) => {
      acc[project.id] = clampPosition(
        positions[project.id] || base[project.id],
        width,
        height
      );
      return acc;
    }, {});
  }, [positions, width, height]);

  // A pane resize mid-menu (entering fullscreen, say) would leave the menu
  // floating at stale coordinates.
  useEffect(() => setMenu(null), [width, height]);

  useEffect(() => {
    if (!menu) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menu]);

  // Phone shell: the same icons in a static, scrollable flow. Free-form
  // dragging is a mouse metaphor, and the persisted pixel layout is never
  // applied here so a desktop arrangement can't end up clamped into a corner.
  if (!floating) {
    return (
      <div className="mac-scroll flex flex-1 flex-wrap content-start justify-center gap-2 overflow-auto bg-[#f6f6f7] p-4 dark:bg-[#1b1b1e]">
        {PROJECTS.map((project) => (
          <ProjectFolderIcon
            key={project.id}
            project={project}
            floating={false}
            selected={selectedId === project.id}
            onSelect={onSelect}
            onOpen={onOpen}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={paneRef}
      onPointerDown={() => onSelect(null)}
      onContextMenu={(e) => {
        e.preventDefault();
        const rect = paneRef.current.getBoundingClientRect();
        setMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      role="group"
      aria-label="Work folder contents"
      className="relative flex-1 overflow-hidden bg-[#f6f6f7] dark:bg-[#1b1b1e]"
    >
      {/* Until the pane has been measured there are no real coordinates to
          place icons at, so render nothing for that one frame rather than
          placing them at a fallback and visibly jumping. */}
      {layout &&
        PROJECTS.map((project) => (
          <ProjectFolderIcon
            key={project.id}
            project={project}
            position={layout[project.id]}
            selected={selectedId === project.id}
            constraintsRef={paneRef}
            onSelect={onSelect}
            onOpen={onOpen}
            onCommitPosition={(position) =>
              setPosition(project.id, clampPosition(position, width, height))
            }
          />
        ))}

      {menu && (
        <CanvasContextMenu
          x={menu.x}
          y={menu.y}
          width={width}
          height={height}
          onClose={() => setMenu(null)}
          onCleanUp={() => setPositions(defaultLayout(width, height, { tidy: true }))}
          onReset={resetPositions}
        />
      )}
    </div>
  );
};

export default IconCanvas;
