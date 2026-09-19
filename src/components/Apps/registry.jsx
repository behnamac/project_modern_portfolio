import FinderApp from "@/components/Apps/Finder/FinderApp";
import SafariApp from "@/components/Apps/Safari/SafariApp";
import PhotosApp from "@/components/Apps/Photos/PhotosApp";
import ContactsApp from "@/components/Apps/Contacts/ContactsApp";
import TerminalApp from "@/components/Apps/Terminal/TerminalApp";
import NotesApp from "@/components/Apps/Notes/NotesApp";
import ResumeApp from "@/components/Apps/Resume/ResumeApp";
import TrashApp from "@/components/Apps/Trash/TrashApp";
import {
  FinderIcon,
  SafariIcon,
  PhotosIcon,
  ContactsIcon,
  TerminalIcon,
  NotesIcon,
  PdfIcon,
  TrashIcon,
} from "@/components/icons";

export const APP_REGISTRY = {
  finder: {
    title: "Finder — Projects",
    icon: <FinderIcon />,
    dockIcon: <FinderIcon />,
    component: FinderApp,
    size: { width: 760, height: 480 },
  },
  safari: {
    title: "Safari",
    icon: <SafariIcon />,
    dockIcon: <SafariIcon />,
    component: SafariApp,
    size: { width: 640, height: 520 },
  },
  photos: {
    title: "Photos",
    icon: <PhotosIcon />,
    dockIcon: <PhotosIcon />,
    component: PhotosApp,
    size: { width: 700, height: 480 },
  },
  contacts: {
    title: "Contact Me",
    icon: <ContactsIcon />,
    dockIcon: <ContactsIcon />,
    component: ContactsApp,
    size: { width: 460, height: 600 },
  },
  terminal: {
    title: "Terminal — techstack.sh",
    icon: <TerminalIcon />,
    dockIcon: <TerminalIcon />,
    component: TerminalApp,
    size: { width: 560, height: 440 },
  },
  notes: {
    title: "Notes",
    icon: <NotesIcon />,
    dockIcon: <NotesIcon />,
    component: NotesApp,
    size: { width: 620, height: 520 },
  },
  resume: {
    title: "Résumé.pdf",
    icon: <PdfIcon />,
    dockIcon: null,
    component: ResumeApp,
    size: { width: 480, height: 360 },
  },
  trash: {
    title: "Trash",
    icon: <TrashIcon full />,
    dockIcon: <TrashIcon />,
    component: TrashApp,
    size: { width: 480, height: 400 },
  },
};
