// All real content sourced from https://behnamsepehri.de/ and https://www.behnamsepehri.de/cv
// Edit this file to update anything shown across the portfolio "OS".

// Desktop chrome geometry. The window "desk" is inset by these so windows can
// never be dragged under the menu bar or behind the dock.
export const MENUBAR_HEIGHT = 32; // MenuBar is h-8
export const DOCK_RESERVE = 96; // 64px dock bar + 12px bottom gap + magnification headroom

export const PROFILE = {
  name: "Behnam Sepehri",
  shortName: "Behnam",
  initials: "BS",
  title: "Creative Full-Stack Developer",
  location: "Amsterdam, Netherlands",
  yearsExperience: "5+",
  email: "hello@behnamsepehri.nl",
  website: "https://behnamsepehri.nl",
  cvUrl: "https://www.behnamsepehri.de/cv",
  github: "https://github.com/behnamac",
  linkedin: "https://www.linkedin.com/in/behnam-sepehri/",
  bioShort:
    "Full-stack developer who prioritizes clean, efficient code — Meta Front-End certified, based in Amsterdam.",
  bioLong: [
    "Hey, I'm Behnam \u{1F44B} — a full-stack developer with 5+ years of experience building responsive, scalable web applications.",
    "I specialize in React, Next.js, TypeScript and Tailwind CSS, with a strong focus on UI/UX, performance and maintainability.",
    "Before web development I built mobile games at CORE Studio, which is probably why I still care way too much about how things feel to interact with.",
    "Outside of client work, you'll find me redesigning my own portfolio one more time, tweaking layouts at 2AM.",
  ],
};

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

export const PROJECTS = [
  {
    id: "nike",
    name: "Nike E-Commerce Platform",
    folder: "Project 1 (Nike Store)",
    description:
      "Fully responsive modern e-commerce platform with a 3D hero section, dynamic catalog, shopping cart and authentication.",
    tech: ["Next.js 15", "React", "TypeScript", "Three.js", "Tailwind CSS", "Neon"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
  {
    id: "patient-mgmt",
    name: "Patient Management System",
    folder: "Project 2 (PatientMgmt)",
    description:
      "Full-stack healthcare system for managing patient info, appointments and clinical workflows.",
    tech: ["Next.js", "Neon", "Tailwind CSS"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
  {
    id: "agriflow",
    name: "AgriFlow Document Hub",
    folder: "Project 3 (AgriFlow)",
    description:
      "Responsive document management system built for agricultural logistics teams.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
  {
    id: "calendar-clone",
    name: "Calendar Clone",
    folder: "Project 4 (Calendar)",
    description:
      "A modern React calendar app with event management and multiple view modes.",
    tech: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
  {
    id: "movie-explorer",
    name: "Movie Explorer",
    folder: "Project 5 (MovieExplorer)",
    description:
      "A movie search app with details view and a favorites list, built with React Native.",
    tech: ["TypeScript", "Tailwind CSS", "React Native"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
  {
    id: "game-news",
    name: "Game News Website",
    folder: "Project 6 (GameNews)",
    description: "A dynamic gaming news and trends platform.",
    tech: ["React", "JavaScript", "CSS"],
    githubUrl: "https://github.com/behnamac",
    liveUrl: null,
  },
];

export const TECH_STACK = [
  { category: "Frontend", technologies: "React, Next.js, TypeScript, JavaScript" },
  { category: "Styling", technologies: "Tailwind CSS, SASS, Chakra UI, Framer, GSAP" },
  { category: "Backend", technologies: "Node.js, PostgreSQL, Neon" },
  { category: "Mobile", technologies: "React Native" },
  { category: "Dev Tools", technologies: "Docker, Three.js, Git, CI/CD" },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Sherpa Digital",
    period: "Jun 2025 — Present",
    location: "Amsterdam, Netherlands",
    tech: ["Next.js", "Three.js", "Flask", "Azure", "Docker", "Tailwind CSS", "Nginx", "CI/CD"],
    highlights: [
      "Built responsive UIs and implemented state management across client products",
      "Refactored legacy architectures for maintainability",
      "Enhanced UI/UX across multiple internal and client-facing apps",
    ],
  },
  {
    id: 2,
    role: "Freelancer",
    company: "Self-employed",
    period: "Nov 2024 — Present",
    location: "Haarlem, Netherlands",
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js", "Tailwind CSS", "Chakra UI"],
    highlights: [
      "Front-end maintenance and UI component translation for client apps",
      "API integration and responsive design work",
    ],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "UnternehmerTUM",
    period: "Aug 2024 — May 2025",
    location: "Munich, Germany",
    tech: ["React", "FastAPI", "HTML", "CSS", "Tailwind CSS", "REST API", "TypeScript"],
    highlights: [
      "Cross-functional collaboration in agile teams",
      "Rapid prototyping of new product concepts",
    ],
  },
  {
    id: 4,
    role: "Frontend Web Developer",
    company: "Sumrand",
    period: "Jun 2023 — May 2024",
    location: "Istanbul, Türkiye",
    tech: ["React", "JavaScript", "CSS", "HTML"],
    highlights: [
      "Built dynamic applications with SSR/SSG",
      "API integration across several client projects",
    ],
  },
  {
    id: 5,
    role: "Game Developer",
    company: "CORE Studio",
    period: "Oct 2021 — May 2023",
    location: "Istanbul, Türkiye",
    tech: ["Unity", "Three.js", "Adobe Photoshop", "UX"],
    highlights: [
      "Shipped mobile games for iOS/Android",
      "Collaborated with publishers including Rollic and Supercent",
    ],
  },
];

export const EDUCATION = [
  "Software Engineer Track — Digital Product School (UnternehmerTUM)",
  "Meta Front-End Developer Professional Certificate",
  "IBM Front-End Developer Professional Certificate",
  "Codecademy Full-Stack Engineer Career Path",
  "Advanced React Certificate",
  "SQL & Generative AI Certificates",
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Cihan Akbil",
    title: "Co-Founder, CORE Studio",
    quote:
      "During our time working with Behnam, we developed dozens of projects together. His love for his job, desire for self-improvement and innovative approach always won admiration. Beyond being a good team player, he makes strategic decisions independently, handles pressure, and remains calm during crises.",
  },
  {
    id: 2,
    name: "Arham Eskafi Noghani",
    title: "Technical Project Manager",
    quote:
      "Behnam blends deep technical skills with creative problem-solving. He's a skilled developer and proactive communicator who regularly updated the creative team, ensuring alignment on project goals and progress.",
  },
  {
    id: 3,
    name: "Ehsan Seyedi",
    title: "Engineering Manager",
    quote:
      "Behnam consistently demonstrated passion for development and talent for innovative, efficient solutions. His expertise in coding, system design, and problem-solving proved invaluable. He's a strong communicator and team player who shares knowledge generously.",
  },
  {
    id: 4,
    name: "Claire Wang",
    title: "Interaction Designer, UnternehmerTUM",
    quote:
      "Working with Behnam on NestFreund was excellent. As Front-End Developer, he turned design concepts into functional, accessible products. What stood out was his willingness to adapt and grow collaboratively.",
  },
  {
    id: 5,
    name: "Amirreza Karimyrad",
    title: "Lead Software Engineer, Able",
    quote:
      "Behnam is a fantastic developer you can always rely on to deliver, even under pressure. Working alongside him, despite differing expertise areas, had an amazing positive impact.",
  },
];
