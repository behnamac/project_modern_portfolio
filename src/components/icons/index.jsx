// Original, simplified glyph set styled to evoke a desktop OS without
// tracing/copying any real operating system's actual icon artwork.

const base = "w-full h-full";

export const FinderIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <defs>
      <linearGradient id="finderG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8ec9ff" />
        <stop offset="1" stopColor="#2f6fed" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#finderG)" />
    <path d="M50 8 A42 42 0 0 1 50 92 Z" fill="#eef6ff" opacity="0.9" />
    <circle cx="38" cy="42" r="5" fill="#0b2a63" />
    <circle cx="62" cy="42" r="5" fill="#eef6ff" />
    <path d="M32 66 Q50 80 68 66" stroke="#0b2a63" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const SafariIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <defs>
      <linearGradient id="safariG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eaf6ff" />
        <stop offset="1" stopColor="#bfe3ff" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#safariG)" stroke="#7fb8e6" strokeWidth="2" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="8"
        x2="50"
        y2="14"
        stroke="#33608a"
        strokeWidth="1.5"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
    <polygon points="50,20 58,50 50,80 42,50" fill="#ff5b4d" transform="rotate(30 50 50)" />
    <circle cx="50" cy="50" r="4" fill="#33608a" />
  </svg>
);

export const PhotosIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <rect width="100" height="100" rx="22" fill="#fdfdfd" />
    <g transform="translate(50 50)">
      {[
        ["#ff5f57", 0],
        ["#ffbd2e", 90],
        ["#28c840", 180],
        ["#2f6fed", 270],
      ].map(([color, rot]) => (
        <path
          key={rot}
          d="M0 0 L34 -8 A34 34 0 0 1 8 34 Z"
          fill={color}
          transform={`rotate(${rot})`}
          opacity="0.92"
        />
      ))}
    </g>
  </svg>
);

export const ContactsIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <defs>
      <linearGradient id="contactG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b98a4e" />
        <stop offset="1" stopColor="#8a5a26" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#contactG)" />
    <circle cx="50" cy="40" r="16" fill="#fff2df" />
    <path d="M22 82 Q50 56 78 82" fill="#fff2df" />
  </svg>
);

export const TerminalIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <rect width="100" height="100" rx="22" fill="#0d0f14" />
    <rect x="14" y="14" width="72" height="72" rx="10" fill="#17191f" />
    <path d="M26 40 L40 50 L26 60" stroke="#3ee06a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="46" y1="60" x2="70" y2="60" stroke="#3ee06a" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const NotesIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <rect width="100" height="100" rx="22" fill="#f4d24a" />
    <rect x="16" y="26" width="68" height="10" fill="#e0ad12" />
    <rect x="16" y="42" width="68" height="46" fill="#fffdf3" />
    <line x1="26" y1="56" x2="74" y2="56" stroke="#d8d0ac" strokeWidth="3" />
    <line x1="26" y1="68" x2="74" y2="68" stroke="#d8d0ac" strokeWidth="3" />
    <line x1="26" y1="80" x2="58" y2="80" stroke="#d8d0ac" strokeWidth="3" />
  </svg>
);

export const TrashIcon = ({ full = false }) => (
  <svg viewBox="0 0 100 100" className={base}>
    <path d="M28 32 H72 L66 88 H34 Z" fill={full ? "#c9ced6" : "#eef1f5"} stroke="#9aa1ac" strokeWidth="2" />
    <rect x="20" y="24" width="60" height="10" rx="4" fill="#b9c0cb" />
    <rect x="42" y="12" width="16" height="10" rx="3" fill="#b9c0cb" />
    {full && (
      <>
        <line x1="40" y1="42" x2="42" y2="78" stroke="#9aa1ac" strokeWidth="3" />
        <line x1="50" y1="42" x2="50" y2="78" stroke="#9aa1ac" strokeWidth="3" />
        <line x1="60" y1="42" x2="58" y2="78" stroke="#9aa1ac" strokeWidth="3" />
      </>
    )}
  </svg>
);

export const FolderIcon = () => (
  <svg viewBox="0 0 100 80" className={base}>
    <defs>
      <linearGradient id="folderG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7fd0ff" />
        <stop offset="1" stopColor="#3d9bdb" />
      </linearGradient>
    </defs>
    <path d="M4 16 h30 l8 10 h54 v46 a6 6 0 0 1 -6 6 H10 a6 6 0 0 1 -6 -6 Z" fill="url(#folderG)" />
    <path d="M4 16 h30 l8 10 h-38 z" fill="#a9e0ff" />
  </svg>
);

export const PdfIcon = () => (
  <svg viewBox="0 0 100 100" className={base}>
    <path d="M22 4 h40 l16 16 v76 h-56 z" fill="#fbfbfb" stroke="#d7dae0" strokeWidth="2" />
    <path d="M62 4 v16 h16 z" fill="#e3e6ea" />
    <rect x="30" y="56" width="40" height="18" rx="3" fill="#e8453c" />
    <text x="50" y="69" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">PDF</text>
  </svg>
);

export const WifiGlyph = (props) => (
  <svg viewBox="0 0 24 18" className="w-4 h-4" {...props}>
    <path d="M1 6.5 A16 12 0 0 1 23 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 10.5 A10 8 0 0 1 19 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15" r="2" fill="currentColor" />
  </svg>
);

export const SearchGlyph = (props) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ControlGlyph = (props) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <rect x="2" y="5" width="20" height="4" rx="2" fill="currentColor" />
    <rect x="2" y="15" width="20" height="4" rx="2" fill="currentColor" />
    <circle cx="16" cy="7" r="2.4" fill="currentColor" stroke="white" strokeWidth="1" />
    <circle cx="8" cy="17" r="2.4" fill="currentColor" stroke="white" strokeWidth="1" />
  </svg>
);

export const LogoMark = (props) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#1e2230" />
    <text x="12" y="16" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="800" fill="white" textAnchor="middle">BS</text>
  </svg>
);
