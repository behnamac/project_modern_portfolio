// Real macOS-style icon assets (from /public/images and /public/icons) wired
// in behind the same component names used everywhere else in the app, so no
// consumer (registry, Finder, DesktopIcons, MenuBar...) needs to change.
// Icons with a hardcoded black fill get `dark:invert` so they stay visible
// against the dark menu bar; icons already colored (app icons, brand marks
// on solid buttons) are left as-is.

export const FinderIcon = () => (
  <img src="/images/finder.png" alt="Finder" className="h-full w-full object-contain" />
);

export const SafariIcon = () => (
  <img src="/images/safari.png" alt="Safari" className="h-full w-full object-contain" />
);

export const PhotosIcon = () => (
  <img src="/images/photos.png" alt="Photos" className="h-full w-full object-contain" />
);

export const ContactsIcon = () => (
  <img src="/images/contact.png" alt="Contacts" className="h-full w-full object-contain" />
);

export const TerminalIcon = () => (
  <img src="/images/terminal.png" alt="Terminal" className="h-full w-full object-contain" />
);

export const FolderIcon = () => (
  <img src="/images/folder.png" alt="Folder" className="h-full w-full object-contain" />
);

export const PdfIcon = () => (
  <img src="/images/pdf.png" alt="Résumé" className="h-full w-full object-contain" />
);

export const TrashIcon = () => (
  <img src="/images/trash.png" alt="Trash" className="h-full w-full object-contain" />
);

// No dedicated "Notes" icon shipped in the asset kit — kept as a small
// original glyph so the Notes app still has something to show.
export const NotesIcon = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full">
    <rect width="100" height="100" rx="22" fill="#f4d24a" />
    <rect x="16" y="26" width="68" height="10" fill="#e0ad12" />
    <rect x="16" y="42" width="68" height="46" fill="#fffdf3" />
    <line x1="26" y1="56" x2="74" y2="56" stroke="#d8d0ac" strokeWidth="3" />
    <line x1="26" y1="68" x2="74" y2="68" stroke="#d8d0ac" strokeWidth="3" />
    <line x1="26" y1="80" x2="58" y2="80" stroke="#d8d0ac" strokeWidth="3" />
  </svg>
);

export const WifiGlyph = (props) => (
  <img src="/icons/wifi.svg" alt="Wi-Fi" className="h-4 w-4 dark:invert" {...props} />
);

export const SearchGlyph = (props) => (
  <img src="/icons/search.svg" alt="Search" className="h-4 w-4 dark:invert" {...props} />
);

export const ControlGlyph = (props) => (
  <img src="/icons/mode.svg" alt="Control Center" className="h-4 w-4 dark:invert" {...props} />
);

export const LogoMark = (props) => (
  <img src="/images/logo.svg" alt="Logo" className="h-4 w-4 dark:invert" {...props} />
);

export const GithubGlyph = (props) => (
  <img src="/icons/github.svg" alt="GitHub" className="h-4 w-4" {...props} />
);

export const LinkedinGlyph = (props) => (
  <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-4 w-4" {...props} />
);
