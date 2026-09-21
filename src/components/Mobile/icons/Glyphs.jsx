// SF-style stroke glyphs on a 24x24 grid. All inherit currentColor, so a
// var-driven text colour on the parent themes them for free.
const Glyph = ({ children, width = 1.75, className = "h-6 w-6", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

// SF Symbols draws chevron.backward heavier than body weight.
export const ChevronLeft = (p) => (
  <Glyph width={2.2} {...p}>
    <path d="M15 4.5 7.5 12 15 19.5" />
  </Glyph>
);

export const ChevronRight = (p) => (
  <Glyph width={1.9} {...p}>
    <path d="M9 4.5 16.5 12 9 19.5" />
  </Glyph>
);

export const SearchGlyph = (p) => (
  <Glyph {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.4 15.4 21 21" />
  </Glyph>
);

export const MicGlyph = (p) => (
  <Glyph {...p}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
  </Glyph>
);

export const ShareGlyph = (p) => (
  <Glyph {...p}>
    <path d="M12 15.5V3.5M8 7.2 12 3.2l4 4" />
    <path d="M6.5 10.5H5A1.5 1.5 0 0 0 3.5 12v7A1.5 1.5 0 0 0 5 20.5h14a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1.5" />
  </Glyph>
);

export const XmarkGlyph = (p) => (
  <Glyph {...p}>
    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
  </Glyph>
);

export const GlobeGlyph = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
  </Glyph>
);

export const FolderGlyph = (p) => (
  <Glyph {...p}>
    <path d="M2.75 6.5A2.5 2.5 0 0 1 5.25 4h3.4a2 2 0 0 1 1.5.68l1.1 1.25a2 2 0 0 0 1.5.67h5A2.5 2.5 0 0 1 20.25 9v8.5A2.5 2.5 0 0 1 17.75 20H5.25a2.5 2.5 0 0 1-2.5-2.5z" />
  </Glyph>
);

export const PersonGlyph = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M3.8 20.5a8.2 8.2 0 0 1 16.4 0" />
  </Glyph>
);

export const DocGlyph = (p) => (
  <Glyph {...p}>
    <path d="M6 2.5h6.8L18.5 8.3v12.2a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 6 2.5z" />
    <path d="M12.8 2.5V8.3H18.5" />
  </Glyph>
);

export const PhotoGlyph = (p) => (
  <Glyph {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M3.5 16.5 8 12l3.5 3.5L15 12l5.5 5.5" />
    <circle cx="15.5" cy="8" r="1.6" />
  </Glyph>
);

export const AlbumGlyph = (p) => (
  <Glyph {...p}>
    <rect x="2.5" y="8.5" width="19" height="12.5" rx="3" />
    <path d="M5.5 5.5h13M8 2.75h8" />
  </Glyph>
);

export const BriefcaseGlyph = (p) => (
  <Glyph {...p}>
    <rect x="2.5" y="6.5" width="19" height="13" rx="3" />
    <path d="M8.5 6.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M2.5 12h19" />
  </Glyph>
);

export const TerminalGlyph = (p) => (
  <Glyph {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <path d="M7 10l3 2.5L7 15M13 15h4" />
  </Glyph>
);

export const GearGlyph = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14.2a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V20a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.9 18.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H2a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 3.7 7.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H8.1a1.7 1.7 0 0 0 1.03-1.56V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V8.1a1.7 1.7 0 0 0 1.56 1.03H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.56 1.03z" />
  </Glyph>
);

export const TrashGlyph = (p) => (
  <Glyph {...p}>
    <path d="M3.5 6.5h17M9.5 6.5V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1.5" />
    <path d="M5.5 6.5l1 13a2 2 0 0 0 2 1.9h7a2 2 0 0 0 2-1.9l1-13" />
  </Glyph>
);

/* ─────────────── status-bar indicators (their own geometry) ────────────── */

export const SignalBars = () => (
  <svg viewBox="0 0 18 11" className="h-[11px] w-[18px]" fill="currentColor" aria-hidden="true">
    {[
      { x: 0, y: 7, h: 4 },
      { x: 4.5, y: 5, h: 6 },
      { x: 9, y: 3, h: 8 },
      { x: 13.5, y: 1, h: 10 },
    ].map((b) => (
      <rect key={b.x} x={b.x} y={b.y} width="3" height={b.h} rx="1" />
    ))}
  </svg>
);

export const WifiGlyph = () => (
  <svg
    viewBox="0 0 16 12"
    className="h-3 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M1.2 4.3a10 10 0 0 1 13.6 0" />
    <path d="M3.6 6.9a6.5 6.5 0 0 1 8.8 0" />
    <path d="M6.1 9.4a3 3 0 0 1 3.8 0" />
    <circle cx="8" cy="11" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const BatteryGlyph = ({ level = 0.82 }) => (
  <svg viewBox="0 0 28 12" className="h-3 w-7" aria-hidden="true">
    <rect
      x="0.5"
      y="0.5"
      width="24"
      height="11"
      rx="3.5"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.35"
    />
    <rect
      x="2"
      y="2"
      width={Math.max(0, Math.min(1, level)) * 21}
      height="8"
      rx="2"
      fill="currentColor"
    />
    <path
      d="M26.5 4.2v3.6a2 2 0 0 0 0-3.6Z"
      fill="currentColor"
      fillOpacity="0.4"
    />
  </svg>
);
