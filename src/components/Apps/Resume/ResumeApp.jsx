import { PROFILE } from "@/constants";
import { PdfIcon } from "@/components/icons";

const ResumeApp = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-sm">
    <span className="h-20 w-20">
      <PdfIcon />
    </span>
    <div>
      <h2 className="text-base font-semibold">{PROFILE.name} — Résumé</h2>
      <p className="mt-1 text-black/60 dark:text-white/60">
        {PROFILE.title} · {PROFILE.yearsExperience} years of experience
      </p>
    </div>
    <div className="flex gap-2">
      <a
        href={PROFILE.cvUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
      >
        View Full CV Online
      </a>
      <a
        href="/files/resume.pdf"
        download
        className="rounded-lg bg-black/[0.06] px-4 py-2 text-xs font-semibold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
      >
        Download PDF
      </a>
    </div>
    <p className="max-w-xs text-[11px] text-black/40 dark:text-white/40">
      Drop a resume.pdf into /public/files to make the download button point at your own file.
    </p>
  </div>
);

export default ResumeApp;
