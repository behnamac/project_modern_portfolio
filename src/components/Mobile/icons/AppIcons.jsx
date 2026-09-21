import {
  FinderIcon,
  SafariIcon,
  PhotosIcon,
  ContactsIcon,
  TerminalIcon,
  NotesIcon,
  TrashIcon,
  PdfIcon,
} from "@/components/icons";
import Squircle from "./Squircle";

// Mobile reuses the DESKTOP icon artwork so both shells look like the same
// machine. They are <img> wrappers over /public/images sized by the parent,
// which is the contract the rest of the app already uses.
//
// No squircle mask is applied: each PNG already carries its own silhouette
// and shadow, and several of them (Trash, the folder, the PDF) are shaped
// objects rather than square tiles, so clipping them would cut them off.
export const FilesIcon = FinderIcon;
export const BinIcon = TrashIcon;
export const ResumeIcon = PdfIcon;

export { SafariIcon, PhotosIcon, ContactsIcon, TerminalIcon, NotesIcon };

// The one exception: Settings is mobile-only (the phone has no menu bar, so
// the theme switch needs a home) and has no desktop counterpart to borrow,
// so it stays a drawn tile.
export const SettingsIcon = () => (
  <Squircle from="#C8C8CE" to="#8A8A90" title="Settings">
    <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="11" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="50" y1="26" x2="50" y2="34" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="24" opacity="0.55" strokeWidth="4" />
    </g>
  </Squircle>
);
