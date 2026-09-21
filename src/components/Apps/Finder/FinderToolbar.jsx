import { ChevronGlyph, SearchGlyph } from "@/components/icons";

const NAV_BTN =
  "flex h-6 w-6 items-center justify-center rounded-md text-black/60 transition enabled:hover:bg-black/5 disabled:opacity-25 dark:text-white/60 dark:enabled:hover:bg-white/10";

const FinderToolbar = ({ title, icon, canBack, canForward, onBack, onForward }) => (
  <div className="flex h-11 shrink-0 items-center gap-2 border-b border-black/10 px-3 dark:border-white/10">
    <div className="flex items-center gap-0.5">
      <button onClick={onBack} disabled={!canBack} aria-label="Back" className={NAV_BTN}>
        <ChevronGlyph direction="left" />
      </button>
      <button
        onClick={onForward}
        disabled={!canForward}
        aria-label="Forward"
        className={NAV_BTN}
      >
        <ChevronGlyph direction="right" />
      </button>
    </div>
    {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
    <span className="truncate text-[13px] font-semibold">{title}</span>
    {/* Decorative: it matches the real Finder chrome without shipping dead UI. */}
    <span aria-hidden className="ml-auto opacity-50">
      <SearchGlyph />
    </span>
  </div>
);

export default FinderToolbar;
