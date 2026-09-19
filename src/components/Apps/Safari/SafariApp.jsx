import { PROFILE, PROJECTS } from "@/constants";

const SafariApp = () => (
  <div className="flex h-full flex-col text-sm">
    <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.02] px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex gap-1.5 text-black/30 dark:text-white/30">
        <span>&larr;</span>
        <span>&rarr;</span>
      </div>
      <div className="flex-1 truncate rounded-md bg-black/[0.06] px-3 py-1 text-center text-xs text-black/60 dark:bg-white/10 dark:text-white/60">
        {PROFILE.website.replace("https://", "")}
      </div>
    </div>
    <div className="mac-scroll flex-1 overflow-auto p-6">
      <h1 className="mb-1 text-xl font-bold">{PROFILE.name}</h1>
      <p className="mb-6 text-black/60 dark:text-white/60">{PROFILE.title} · {PROFILE.location}</p>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
        Featured Work
      </h2>
      <div className="space-y-3">
        {PROJECTS.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-black/10 p-3 dark:border-white/10"
          >
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">{p.description}</p>
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-medium text-blue-500 hover:underline"
            >
              Check out the repo &rsaquo;
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SafariApp;
