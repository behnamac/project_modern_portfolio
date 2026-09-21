import {
  FilesIcon,
  SafariIcon,
  PhotosIcon,
  ContactsIcon,
  TerminalIcon,
  NotesIcon,
  BinIcon,
  SettingsIcon,
} from "./icons/AppIcons";
import {
  FolderGlyph,
  PersonGlyph,
  PhotoGlyph,
  AlbumGlyph,
  SearchGlyph,
} from "./icons/Glyphs";

import WorkScreen from "./apps/files/WorkScreen";
import ProjectScreen from "./apps/files/ProjectScreen";
import AboutScreen from "./apps/files/AboutScreen";
import ResumeScreen from "./apps/files/ResumeScreen";
import AllPhotosScreen from "./apps/photos/AllPhotosScreen";
import AlbumsScreen from "./apps/photos/AlbumsScreen";
import PhotoSearchScreen from "./apps/photos/PhotoSearchScreen";
import PhotoViewer from "./apps/photos/PhotoViewer";
import NoteListScreen from "./apps/notes/NoteListScreen";
import NoteDetailScreen from "./apps/notes/NoteDetailScreen";
import ContactCardScreen from "./apps/contacts/ContactCardScreen";
import MessageFormScreen from "./apps/contacts/MessageFormScreen";
import TerminalScreen from "./apps/terminal/TerminalScreen";
import SafariScreen from "./apps/safari/SafariScreen";
import BinScreen from "./apps/bin/BinScreen";
import SettingsScreen from "./apps/settings/SettingsScreen";

// Mobile's own app list. Deliberately NOT an extra field on APP_REGISTRY:
// the id sets differ (finder -> files, resume demoted to a file inside Files,
// settings is mobile-only), APP_REGISTRY's `icon` is a pre-rendered element
// sized by its parent rather than a component, and its `size` is meaningless
// on a phone. Keeping them apart also stops the whole mobile tree entering
// the import graph of Dock, DesktopIcons, FinderSidebar and WindowManager.
export const MOBILE_APPS = {
  files: {
    id: "files",
    name: "Files",
    Icon: FilesIcon,
    tabs: [
      { id: "work", label: "Work", Icon: FolderGlyph, root: "work" },
      { id: "about", label: "About Me", Icon: PersonGlyph, root: "about" },
    ],
    screens: {
      work: WorkScreen,
      project: ProjectScreen,
      about: AboutScreen,
      resume: ResumeScreen,
    },
  },
  safari: {
    id: "safari",
    name: "Safari",
    Icon: SafariIcon,
    root: "browser",
    screens: { browser: SafariScreen },
  },
  photos: {
    id: "photos",
    name: "Photos",
    Icon: PhotosIcon,
    tabs: [
      { id: "all", label: "All Photos", Icon: PhotoGlyph, root: "all" },
      { id: "albums", label: "Albums", Icon: AlbumGlyph, root: "albums" },
      { id: "search", label: "Search", Icon: SearchGlyph, root: "search" },
    ],
    screens: {
      all: AllPhotosScreen,
      albums: AlbumsScreen,
      search: PhotoSearchScreen,
      viewer: PhotoViewer,
    },
  },
  contacts: {
    id: "contacts",
    name: "Contacts",
    Icon: ContactsIcon,
    root: "card",
    screens: { card: ContactCardScreen, message: MessageFormScreen },
  },
  notes: {
    id: "notes",
    name: "Notes",
    Icon: NotesIcon,
    root: "list",
    screens: { list: NoteListScreen, note: NoteDetailScreen },
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    Icon: TerminalIcon,
    root: "shell",
    tone: "light", // dark surface in both themes
    screens: { shell: TerminalScreen },
  },
  bin: {
    id: "bin",
    name: "Bin",
    Icon: BinIcon,
    root: "bin",
    screens: { bin: BinScreen },
  },
  settings: {
    id: "settings",
    name: "Settings",
    Icon: SettingsIcon,
    root: "settings",
    screens: { settings: SettingsScreen },
  },
};

// Résumé is not an app here; it lives inside Files as Resume.pdf.
export const DOCK_LAYOUT = ["files", "safari", "photos", "contacts"];
export const HOME_LAYOUT = ["notes", "terminal", "bin", "settings"];
