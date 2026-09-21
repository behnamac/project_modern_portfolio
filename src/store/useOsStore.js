import { create } from "zustand";

const DEFAULT_SIZE = { width: 720, height: 500 };

let zCounter = 10;

// Windows are keyed by a unique instance id so the same app (e.g. a Finder
// project) could in theory be opened more than once, though our dock/desktop
// icons currently just focus the existing instance instead of duplicating it.
export const useOsStore = create((set, get) => ({
  booted: false,
  theme: "dark",
  windows: [], // { id, app, title, props, position, size, minimized, fullscreen, zIndex }

  finishBoot: () => set({ booted: true }),

  setTheme: (theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  openWindow: ({ id, app, title, props = {}, size }) => {
    const existing = get().windows.find((w) => w.id === id);
    if (existing) {
      get().focusWindow(id);
      get().restoreWindow(id);
      return;
    }
    zCounter += 1;
    const openCount = get().windows.length;
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id,
          app,
          title,
          props,
          minimized: false,
          fullscreen: false,
          size: size || DEFAULT_SIZE,
          position: {
            x: 120 + (openCount % 5) * 40,
            y: 90 + (openCount % 5) * 30,
          },
          zIndex: zCounter,
        },
      ],
    }));
  },

  closeWindow: (id) =>
    set((state) => ({ windows: state.windows.filter((w) => w.id !== id) })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    })),

  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: false } : w
      ),
    })),

  focusWindow: (id) => {
    zCounter += 1;
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: zCounter } : w
      ),
    }));
  },

  // Simulated, in-app fullscreen (never the browser Fullscreen API): the
  // window grows to cover the whole viewport and MenuBar/Dock slide away.
  // position/size are left untouched, so exiting restores the exact old rect.
  // Only one window can be fullscreen at a time, like a macOS Space.
  toggleFullscreen: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, fullscreen: !w.fullscreen }
          : w.fullscreen
          ? { ...w, fullscreen: false }
          : w
      ),
    })),

  moveWindow: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })),
}));
