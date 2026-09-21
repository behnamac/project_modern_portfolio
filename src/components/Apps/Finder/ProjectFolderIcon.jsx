import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FolderIcon } from "@/components/icons";
import { ICON_W } from "./layout";

// One project folder in the Finder icon view.
//
// `position` (from the store, via IconCanvas) is the single source of truth and
// is applied as left/top. framer-motion only ever writes a TRANSIENT x/y
// offset, which is reset to 0 in onDragEnd right after the new absolute
// position is committed — the same contract as Window.jsx, so an old offset is
// never counted twice and the icon never jumps on release.
//
// Dragging is pointer-only by design: the arrangement is decorative, and every
// project stays reachable through the sidebar list and the tab order.
const ProjectFolderIcon = ({
  project,
  position,         // { x, y } when floating; ignored otherwise
  floating = true,  // false -> static flow item, no drag (phone shell)
  selected,
  constraintsRef,
  onSelect,
  onOpen,
  onCommitPosition,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  // framer only fires onDragStart past its own small threshold, so "a drag
  // happened" IS the threshold — use it to swallow the click the browser fires
  // on the pointerup that ended the drag.
  const suppressClick = useRef(false);

  return (
    <motion.button
      type="button"
      drag={floating}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      whileDrag={{ scale: 1.04 }}
      style={
        floating
          ? {
              x,
              y,
              left: position.x,
              top: position.y,
              width: ICON_W,
              zIndex: dragging ? 30 : selected ? 20 : 10,
            }
          : { width: ICON_W }
      }
      onDragStart={() => {
        setDragging(true);
        suppressClick.current = true;
      }}
      onDragEnd={(_, info) => {
        setDragging(false);
        onCommitPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
        x.set(0);
        y.set(0);
      }}
      // macOS selects on mouse-DOWN, which also means grabbing an unselected
      // icon selects it before the drag starts. stopPropagation keeps the
      // canvas' "pointerdown on empty space = deselect" handler from undoing it.
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect(project.id);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (suppressClick.current) suppressClick.current = false;
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen(project.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
      aria-pressed={selected}
      aria-label={`${project.folder} — ${project.name}`}
      className={`${floating ? "absolute" : "relative"} flex touch-none select-none flex-col items-center gap-1 rounded-lg p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
        dragging ? "cursor-grabbing" : "cursor-default"
      } ${selected ? "bg-blue-500/15" : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"}`}
    >
      {/* pointer-events-none so the gesture target is always the button */}
      <span className="pointer-events-none h-14 w-14 drop-shadow-md">
        <FolderIcon />
      </span>
      <span
        className={`pointer-events-none max-w-full break-words rounded px-1.5 py-0.5 text-[11px] font-medium leading-tight ${
          selected ? "bg-blue-500 text-white" : "text-black/80 dark:text-white/85"
        }`}
      >
        {project.folder}
      </span>
    </motion.button>
  );
};

export default ProjectFolderIcon;
