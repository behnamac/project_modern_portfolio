import { create } from "zustand";

// The phone's navigation state: which app is open and, per app, a stack of
// screens per tab.
//
// Kept separate from useOsStore for the same reason useFinderLayoutStore is:
// that store holds windows, z-order and fullscreen, none of which exist on a
// phone, and mixing the two would re-render desktop subscribers on every
// mobile push.
//
// Stacks are NOT cleared when you go home, which is what makes re-opening an
// app resume where you left it, the way iOS does.
//
// The app definition is PASSED IN to openApp rather than imported: the
// registry imports every screen, and the screens import this store, so
// importing the registry here would close a cycle that breaks module init.

let seq = 0;
const entry = (screen, params = {}) => ({ key: `${screen}#${++seq}`, screen, params });

const seedStack = (app) => {
  const tabs = app.tabs || [];
  if (!tabs.length) {
    return { tab: "__single", byTab: { __single: [entry(app.root)] } };
  }
  return {
    tab: tabs[0].id,
    byTab: Object.fromEntries(tabs.map((t) => [t.id, [entry(t.root)]])),
  };
};

export const useMobileStore = create((set, get) => ({
  activeApp: null, // null = home screen
  launchRect: null, // the tapped icon's rect, for the zoom transition
  direction: 1, // 1 = push, -1 = pop, 0 = tab change (crossfade)
  stacks: {},

  openApp: (appId, rect, app) =>
    set((state) => ({
      activeApp: appId,
      launchRect: rect || null,
      direction: 1,
      stacks: state.stacks[appId]
        ? state.stacks
        : { ...state.stacks, [appId]: seedStack(app) },
    })),

  goHome: () => set({ direction: -1, activeApp: null }),

  // Held until the exit animation finishes, so the app zooms back into the
  // icon it came from rather than just fading out.
  clearLaunchRect: () => set({ launchRect: null }),

  push: (screen, params) =>
    set((state) => {
      const { activeApp, stacks } = state;
      const stack = stacks[activeApp];
      if (!stack) return state;
      const list = stack.byTab[stack.tab];
      return {
        direction: 1,
        stacks: {
          ...stacks,
          [activeApp]: {
            ...stack,
            byTab: { ...stack.byTab, [stack.tab]: [...list, entry(screen, params)] },
          },
        },
      };
    }),

  pop: () =>
    set((state) => {
      const { activeApp, stacks } = state;
      const stack = stacks[activeApp];
      if (!stack) return state;
      const list = stack.byTab[stack.tab];
      if (list.length <= 1) return { direction: -1, activeApp: null };
      return {
        direction: -1,
        stacks: {
          ...stacks,
          [activeApp]: {
            ...stack,
            byTab: { ...stack.byTab, [stack.tab]: list.slice(0, -1) },
          },
        },
      };
    }),

  // Tapping the already-active tab, iOS-style.
  popToRoot: () =>
    set((state) => {
      const { activeApp, stacks } = state;
      const stack = stacks[activeApp];
      if (!stack) return state;
      const list = stack.byTab[stack.tab];
      if (list.length <= 1) return state;
      return {
        direction: -1,
        stacks: {
          ...stacks,
          [activeApp]: {
            ...stack,
            byTab: { ...stack.byTab, [stack.tab]: [list[0]] },
          },
        },
      };
    }),

  setTab: (tabId) =>
    set((state) => {
      const { activeApp, stacks } = state;
      const stack = stacks[activeApp];
      if (!stack) return state;
      if (stack.tab === tabId) return state;
      return {
        direction: 0,
        stacks: { ...stacks, [activeApp]: { ...stack, tab: tabId } },
      };
    }),

  // One backwards step, whatever the depth. This is the ONLY thing popstate
  // calls, so the chevron, the swipe gesture and the browser button can never
  // each pop a level for a single user intent.
  back: () => {
    const { activeApp } = get();
    if (!activeApp) return;
    get().pop();
  },
}));

export const useCurrentStack = () =>
  useMobileStore((s) => {
    const stack = s.stacks[s.activeApp];
    return stack ? stack.byTab[stack.tab] : null;
  });
