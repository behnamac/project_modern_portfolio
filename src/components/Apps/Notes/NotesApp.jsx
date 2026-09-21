import { useState } from "react";
import { PROFILE, EXPERIENCE, CERTIFICATIONS, REFERENCES } from "@/constants";

const NOTE_TABS = ["About Me", "Experience", "Certifications", "References"];

const NotesApp = () => {
  const [tab, setTab] = useState(NOTE_TABS[0]);

  return (
    <div className="flex h-full text-sm">
      <aside className="w-40 shrink-0 border-r border-black/10 bg-black/[0.03] p-2 dark:border-white/10 dark:bg-white/[0.03]">
        {NOTE_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`mb-0.5 block w-full rounded-md px-2 py-1.5 text-left text-xs ${
              tab === t
                ? "bg-yellow-400/80 font-semibold"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </aside>

      <section className="mac-scroll flex-1 overflow-auto bg-[#fffdf3] p-6 text-[#2b2b1f] dark:bg-[#232016] dark:text-[#f3ead0]">
        {tab === "About Me" && (
          <div className="mx-auto max-w-md">
            <h2 className="mb-3 text-base font-bold">Meet {PROFILE.shortName}</h2>
            {PROFILE.bioLong.map((p, i) => (
              <p key={i} className="mb-3 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}

        {tab === "Experience" && (
          <div className="mx-auto max-w-md space-y-4">
            {EXPERIENCE.map((job) => (
              <div key={job.id} className="border-b border-black/10 pb-3 dark:border-white/10">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold">{job.role}</p>
                  <p className="text-xs text-black/50 dark:text-white/50">{job.period}</p>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] dark:bg-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Certifications" && (
          <div className="mx-auto max-w-md">
            <ul className="space-y-2">
              {CERTIFICATIONS.map((certification) => (
                <li
                  key={certification.id}
                  className="border-b border-black/10 pb-2 last:border-0 dark:border-white/10"
                >
                  <p className="leading-snug">{certification.title}</p>
                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View credential &rsaquo;
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "References" && (
          <div className="mx-auto max-w-md space-y-3">
            {REFERENCES.map((reference) => (
              <div
                key={reference.id}
                className="border-b border-black/10 pb-3 last:border-0 dark:border-white/10"
              >
                <p className="font-semibold">{reference.name}</p>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {reference.title}
                </p>
                {reference.email && (
                  <a
                    href={`mailto:${reference.email}`}
                    className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {reference.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default NotesApp;
