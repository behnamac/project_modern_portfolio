# DeskFolio

> A portfolio that boots instead of scrolls — a macOS-inspired desktop environment
> built in React, where every section of a résumé is an app you open.

Rather than a landing page with a hero and five stacked sections, this portfolio
renders a full desktop: a wallpaper, a menu bar with a live clock, double-clickable
desktop icons, a magnifying dock, and draggable, focusable, minimizable windows.
Projects live in Finder. The tech stack prints in Terminal. Experience is a note in
Notes. Testimonials are pictures in Photos. The old, boring portfolio is in the Trash.

---

## Highlights

- **Window manager** — draggable windows with real z-index focus ordering, minimize,
  close, and per-app default sizes, all driven by a single Zustand store.
- **Magnifying dock** — Aceternity UI's Floating Dock, retuned to macOS proportions,
  with a running-app indicator dot.
- **Boot sequence** — a short animated welcome screen before the desktop mounts.
- **Light / dark mode** — switched from the menu bar's control-center menu; the
  wallpaper dims and window chrome re-themes in step.
- **A separate mobile shell** — under 768px the desktop is replaced by an iOS-style
  home screen with app tiles and slide-in app views, not a squeezed-down desktop.
- **Content in one file** — every project, job, testimonial and bio string lives in
  `src/constants/index.js`. Nothing about the shell has to be touched to update it.

## The apps

| App | What it holds |
| --- | --- |
| **Finder** | Projects, one folder each — description, tech chips, repo/live links |
| **Safari** | A mock browser rendering the portfolio site's featured work |
| **Photos** | Testimonials as a gradient photo grid |
| **Contacts** | Quick links (email, GitHub, LinkedIn) plus a `mailto:`-backed contact form |
| **Terminal** | The tech stack, printed line by line as `techstack.sh` output |
| **Notes** | About Me / Experience / Education, as three tabbed notes |
| **Résumé** | CV link and PDF download |
| **Trash** | A joke — the clichés this portfolio avoids |

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 4** (via `@tailwindcss/vite`, no `tailwind.config` file)
- **Framer Motion 10** — boot fade, window spring transitions, dock magnification,
  mobile view slides
- **Zustand 5** — the "OS" state: boot flag, theme, and the window list
- **Day.js** — the menu bar clock
- Plain JavaScript (JSX), ESLint 9 flat config, `@/*` path alias to `src/`

## Getting started

```bash
git clone https://github.com/behnamac/project_modern_portfolio.git
cd project_modern_portfolio
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | ESLint over the repo |
| `npm run deploy` | Builds, then publishes to GitHub Pages via `gh-pages` |

> **Note on `deploy`:** the script currently publishes `build`, but Vite outputs to
> `dist` — change it to `gh-pages -d dist`. If you deploy to a repo subpath (the
> `homepage` field points at `/Animated-Portfolio`), also set `base: "/Animated-Portfolio/"`
> in `vite.config.js` or the built asset URLs will 404.

## Project structure

```
src/
├── App.jsx                 # boot → desktop or mobile shell
├── constants/index.js      # ALL content: profile, projects, experience, testimonials
├── store/useOsStore.js     # zustand: booted, theme, windows[] (open/close/focus/move)
├── hooks/useIsMobile.js    # matchMedia breakpoint hook
├── components/
│   ├── Boot/               # welcome screen
│   ├── Desktop/            # wallpaper, desktop icons, desktop composition
│   ├── MenuBar/            # top bar, nav, theme menu, clock
│   ├── Dock/               # dock wired to the app registry
│   ├── Window/             # Window (drag + title bar) and WindowManager
│   ├── Apps/               # one folder per app + registry.jsx
│   ├── Mobile/             # iOS-style home screen shell
│   ├── icons/              # icon components over /public artwork
│   └── ui/floating-dock.jsx
public/
├── images/                 # app icons, wallpaper, project shots
└── icons/                  # SVG glyphs
```

## Making it yours

1. **Content** — edit `src/constants/index.js`: `PROFILE`, `PROJECTS`, `TECH_STACK`,
   `EXPERIENCE`, `EDUCATION`, `TESTIMONIALS`.
2. **Résumé** — drop a `resume.pdf` into `public/files/` so the download button resolves.
3. **Wallpaper** — replace `public/images/wallpaper.png`.
4. **A new app** — create the component under `src/components/Apps/`, add an entry to
   `APP_REGISTRY` in `registry.jsx`, then list its id in `DOCK_APPS`. The dock, mobile
   home screen and window manager all read from the registry, so nothing else changes.

## Credits

Dock based on [Aceternity UI's Floating Dock](https://ui.aceternity.com/components/floating-dock),
adapted to macOS proportions (see the comment block at the top of `floating-dock.jsx`).

## License

MIT
