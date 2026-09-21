import { FolderIcon } from "@/components/icons";

// The project inspector — unchanged from the original single-pane FinderApp,
// now reached by opening a folder in the icon view (or a sidebar row).
const ProjectDetail = ({ project }) => {
  if (!project) return null;

  return (
    <section className="mac-scroll flex-1 overflow-auto p-6">
      <div className="max-w-lg">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-10 w-10">
            <FolderIcon />
          </span>
          <div>
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-xs text-black/40 dark:text-white/40">{project.folder}</p>
          </div>
        </div>
        <p className="mb-4 leading-relaxed text-black/80 dark:text-white/80">
          {project.description}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/[0.06] px-2.5 py-1 text-xs font-medium dark:bg-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
            >
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-black/[0.06] px-3.5 py-1.5 text-xs font-semibold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
