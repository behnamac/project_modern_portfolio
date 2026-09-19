import { useState } from "react";
import { PROJECTS } from "@/constants";
import { FolderIcon } from "@/components/icons";

const FinderApp = ({ initialProjectId }) => {
  const [selected, setSelected] = useState(initialProjectId || PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === selected);

  return (
    <div className="flex h-full text-sm">
      <aside className="w-52 shrink-0 border-r border-black/10 bg-black/[0.03] p-3 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
          Favorites
        </p>
        <ul className="space-y-0.5">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelected(p.id)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition ${
                  selected === p.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <span className="h-4 w-4 shrink-0">
                  <FolderIcon />
                </span>
                <span className="truncate">{p.folder}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="mac-scroll flex-1 overflow-auto p-6">
        {project && (
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
        )}
      </section>
    </div>
  );
};

export default FinderApp;
