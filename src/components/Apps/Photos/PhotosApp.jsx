import { TESTIMONIALS } from "@/constants";

const palette = [
  "from-violet-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-blue-500",
];

const PhotosApp = () => (
  <div className="flex h-full text-sm">
    <aside className="w-44 shrink-0 border-r border-black/10 bg-black/[0.03] p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
        Photos
      </p>
      <ul className="space-y-0.5 text-black/70 dark:text-white/70">
        <li className="rounded-md bg-blue-500 px-2 py-1.5 text-white">Library</li>
        <li className="rounded-md px-2 py-1.5">Kind Words</li>
        <li className="rounded-md px-2 py-1.5">People</li>
        <li className="rounded-md px-2 py-1.5">Favorites</li>
      </ul>
    </aside>
    <section className="mac-scroll flex-1 overflow-auto p-5">
      <p className="mb-3 text-xs font-semibold text-black/40 dark:text-white/40">
        What people say
      </p>
      <div className="grid grid-cols-2 gap-3">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            className={`flex flex-col justify-between rounded-xl bg-gradient-to-br ${palette[i % palette.length]} p-4 text-white shadow-md`}
          >
            <p className="text-[13px] leading-snug">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-3">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-[11px] opacity-80">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default PhotosApp;
