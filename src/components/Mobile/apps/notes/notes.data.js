import {
  PROFILE,
  EXPERIENCE,
  CERTIFICATIONS,
  REFERENCES,
  EDUCATION,
  LANGUAGES,
} from "@/constants";

// The Notes list. Each entry is one note; the detail screen renders by id.
// Counts are computed so the list can show an iOS-style preview line.
export const NOTES = [
  { id: "about", title: "About Me", preview: `${PROFILE.bioLong.length} paragraphs` },
  { id: "experience", title: "Experience", preview: `${EXPERIENCE.length} roles` },
  {
    id: "certifications",
    title: "Certifications",
    preview: `${CERTIFICATIONS.length} certificates`,
  },
  { id: "education", title: "Education", preview: `${EDUCATION.length} degree` },
  { id: "languages", title: "Languages", preview: `${LANGUAGES.length} languages` },
  { id: "references", title: "References", preview: `${REFERENCES.length} contacts` },
];
