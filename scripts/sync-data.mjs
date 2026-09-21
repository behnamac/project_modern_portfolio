#!/usr/bin/env node
/**
 * Pulls the real portfolio content out of the my-portfolio-website database
 * (Neon Postgres, edited through that project's /admin CMS) and writes it to
 * src/data/portfolio.json, which src/constants/index.js re-exports.
 *
 *   npm run sync:data
 *
 * This runs at AUTHORING time, never at build or run time: the read API sends
 * no CORS headers, so the deployed SPA could not fetch it from the browser
 * anyway, and committing the JSON keeps the build offline-safe and the deploy
 * independent of the other site being up.
 *
 * The output is deterministic — every collection is sorted by its `order`
 * column and nothing timestamped is written — so re-running with unchanged
 * content produces a byte-identical file and `git diff` only ever shows real
 * content changes.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API_URL =
  process.env.PORTFOLIO_API_URL || "https://www.behnamsepehri.de/api/prisma-data";

const OUT_FILE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/portfolio.json"
);

/* ---------------------------------------------------------------- helpers */

// The CMS is a free-text form, so rows arrive with stray whitespace
// ("Sushi Restaurant Website " has a trailing space that would leak into a slug).
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

const slug = (value) =>
  clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Split prose into sentences without shredding "React.js, Next.js, TypeScript" —
// a plain .split(".") would cut inside every one of those names.
const sentences = (text) => clean(text).split(/(?<=\.)\s+/).filter(Boolean);

// Experience descriptions are a single string of "• " bullets. The string always
// STARTS with the bullet, so element 0 is empty and must be dropped — NotesApp
// keys its <li>s on the text and would render a duplicate empty key.
const bullets = (text) =>
  clean(text)
    .split("•")
    .map(clean)
    .filter(Boolean);

const initials = (name) =>
  clean(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

// Desktop and Finder icon labels sit in a ~96px box, so the label keeps the
// distinctive head of the title: the part before a " - " subtitle, capped at
// two words. The full title is still the heading in the project detail pane.
const folderLabel = (title, index) => {
  const head = clean(title).split(/\s+[-–—]\s+/)[0];
  const short = head.split(" ").slice(0, 2).join(" ");
  return `Project ${index + 1} (${short})`;
};

// "#" is the CMS's placeholder for "no live site" and is truthy, so it would
// render a "View Live" button that goes nowhere.
const externalUrl = (value) => {
  const url = clean(value);
  return url && url !== "#" ? url : null;
};

/* ------------------------------------------------------------ tech stack */

// The DB has a "CSS" category holding only SASS alongside "CSS library"; they
// are the same shelf. Anything uncategorised lands in "Other" rather than a
// row labelled "null".
const CATEGORY_ALIASES = { CSS: "CSS library" };
const CATEGORY_ORDER = [
  "Frontend",
  "Language",
  "CSS library",
  "Backend",
  "SQL",
  "Devops",
  "Other",
];

const buildTechStack = (tools) => {
  const groups = new Map();

  for (const tool of [...tools].sort(byOrder)) {
    const raw = clean(tool.category);
    const category = CATEGORY_ALIASES[raw] || raw || "Other";
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(clean(tool.name));
  }

  const rank = (category) => {
    const index = CATEGORY_ORDER.indexOf(category);
    return index === -1 ? CATEGORY_ORDER.length : index;
  };

  return [...groups.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    // TerminalApp renders `technologies` raw, so it stays a joined string.
    .map(([category, names]) => ({ category, technologies: names.join(", ") }));
};

/* --------------------------------------------------------------- mapping */

const mapProfile = (userProfile, hero) => {
  const name = clean(userProfile.name);
  const website = clean(userProfile.website);
  const bio = sentences(userProfile.bio);
  const years = hero?.experience?.years;

  return {
    name,
    shortName: name.split(" ")[0],
    initials: initials(name),
    title: clean(userProfile.title),
    location: clean(userProfile.location),
    yearsExperience: years ? `${years}+` : "",
    email: clean(userProfile.email),
    website,
    // Not a column in the DB — the CV lives on the main site.
    cvUrl: website ? `${website}/cv` : "",
    github: clean(userProfile.github),
    linkedin: clean(userProfile.linkedin),
    bioShort: bio[0] || "",
    // Two sentences a paragraph keeps the Notes column readable.
    bioLong: bio.reduce((paragraphs, sentence, i) => {
      if (i % 2 === 0) paragraphs.push(sentence);
      else paragraphs[paragraphs.length - 1] += ` ${sentence}`;
      return paragraphs;
    }, []),
  };
};

const mapProjects = (projects) =>
  [...projects].sort(byOrder).map((project, index) => ({
    // Row ids are inconsistent ("pro-1" for most, a cuid for the newest), and
    // the slug is also the key for persisted Finder icon positions, so it is
    // derived from the title instead.
    id: slug(project.title),
    name: clean(project.title),
    folder: folderLabel(project.title, index),
    description: clean(project.desc),
    tech: (project.tags || []).map((tag) => clean(tag.name)).filter(Boolean),
    githubUrl: project.hasSourceCode ? externalUrl(project.sourceCode) : null,
    liveUrl: externalUrl(project.href),
  }));

const mapExperience = (experiences) =>
  [...experiences].sort(byOrder).map((job) => ({
    id: job.id,
    role: clean(job.position),
    company: clean(job.company),
    period: clean(job.period),
    location: clean(job.location),
    tech: (job.technologies || []).map(clean).filter(Boolean),
    highlights: bullets(job.description),
  }));

const mapTestimonials = (testimonials) =>
  [...testimonials].sort(byOrder).map((testimonial) => ({
    id: testimonial.id,
    name: clean(testimonial.name),
    title: clean(testimonial.role),
    quote: clean(testimonial.content),
  }));

const mapCertifications = (certifications) =>
  [...certifications].sort(byOrder).map((certification) => ({
    id: certification.id,
    title: clean(certification.title),
    credentialUrl: externalUrl(certification.credentialUrl),
  }));

const mapReferences = (references) =>
  [...references].sort(byOrder).map((reference) => ({
    id: reference.id,
    name: clean(reference.name),
    title: clean(reference.title),
    email: clean(reference.email),
  }));

// Synced but not rendered yet — one Notes tab away if we want them.
const mapEducation = (educations) =>
  [...educations].sort(byOrder).map((education) => ({
    id: education.id,
    degree: clean(education.degree),
    institution: clean(education.institution),
    field: clean(education.field),
    startDate: clean(education.startDate),
    endDate: clean(education.endDate),
    gpa: clean(education.gpa),
  }));

const mapLanguages = (languages) =>
  [...languages].sort(byOrder).map((language) => ({
    id: language.id,
    name: clean(language.name),
    level: clean(language.level),
  }));

/* ------------------------------------------------------------------ main */

const fail = (message) => {
  console.error(`✗ ${message}`);
  console.error("  Nothing was written; the committed portfolio.json is unchanged.");
  process.exit(1);
};

const response = await fetch(API_URL, {
  headers: { accept: "application/json" },
}).catch((error) => fail(`Could not reach ${API_URL}\n  ${error.message}`));

if (!response.ok) fail(`${API_URL} responded ${response.status}`);

const payload = await response.json().catch(() => fail("Response was not JSON"));
const data = payload?.data;
if (!data) fail("Response had no `data` object");

const REQUIRED = [
  "projects",
  "experiences",
  "tools",
  "testimonials",
  "certifications",
  "references",
];

for (const key of REQUIRED) {
  if (!Array.isArray(data[key]) || data[key].length === 0) {
    // Writing empty arrays would ship a portfolio with no work in it.
    fail(`\`${key}\` came back empty`);
  }
}
if (!data.userProfile?.name) fail("`userProfile` came back empty");

const portfolio = {
  // Regenerate with: npm run sync:data
  _source: API_URL,
  profile: mapProfile(data.userProfile, data.hero),
  projects: mapProjects(data.projects),
  techStack: buildTechStack(data.tools),
  experience: mapExperience(data.experiences),
  testimonials: mapTestimonials(data.testimonials),
  certifications: mapCertifications(data.certifications),
  references: mapReferences(data.references),
  education: mapEducation(data.educations || []),
  languages: mapLanguages(data.languages || []),
};

writeFileSync(OUT_FILE, `${JSON.stringify(portfolio, null, 2)}\n`, "utf8");

const counts = [
  `${portfolio.projects.length} projects`,
  `${portfolio.experience.length} roles`,
  `${portfolio.techStack.length} stack rows`,
  `${portfolio.testimonials.length} testimonials`,
  `${portfolio.certifications.length} certifications`,
  `${portfolio.references.length} references`,
];
console.log(`✓ ${portfolio.profile.name} — ${counts.join(", ")}`);
console.log(`  wrote src/data/portfolio.json from ${API_URL}`);
