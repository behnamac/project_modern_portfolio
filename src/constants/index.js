// Content comes from the portfolio database (Neon Postgres), edited in the
// my-portfolio-website admin CMS and pulled in with `npm run sync:data`, which
// rewrites src/data/portfolio.json. Nothing below should be hand-edited — an
// edit here is overwritten by the next sync. Change the content in the CMS.
//
// Desktop chrome and navigation stay hand-written: they describe THIS app's
// shell, not portfolio content, and have no column in the database.
import portfolio from "@/data/portfolio.json";

// The window "desk" is inset by these so windows can never be dragged under the
// menu bar or behind the dock.
export const MENUBAR_HEIGHT = 32; // MenuBar is h-8
export const DOCK_RESERVE = 96; // 64px dock bar + 12px bottom gap + magnification headroom

export const NAV_LINKS = [
  { id: "projects", name: "Projects", app: "finder" },
  { id: "experience", name: "Experience", app: "notes" },
  { id: "contact", name: "Contact", app: "contacts" },
  { id: "resume", name: "Resume", app: "resume" },
];

export const DOCK_APPS = [
  { id: "finder", name: "Finder" },
  { id: "safari", name: "Safari" },
  { id: "photos", name: "Photos" },
  { id: "contacts", name: "Contacts" },
  { id: "terminal", name: "Terminal" },
  { id: "notes", name: "Notes" },
  { id: "trash", name: "Trash" },
];

/* ------------------------------------------------ database-backed content */

export const PROFILE = portfolio.profile;
export const PROJECTS = portfolio.projects;
export const TECH_STACK = portfolio.techStack;
export const EXPERIENCE = portfolio.experience;
export const TESTIMONIALS = portfolio.testimonials;
export const CERTIFICATIONS = portfolio.certifications;
export const REFERENCES = portfolio.references;
export const EDUCATION = portfolio.education;
export const LANGUAGES = portfolio.languages;
