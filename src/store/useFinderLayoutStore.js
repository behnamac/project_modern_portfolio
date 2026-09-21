import { create } from "zustand";
import { persist } from "zustand/middleware";

export const FINDER_LAYOUT_STORAGE_KEY = "mac-portfolio:finder-layout";

// Free-form icon positions for the Finder "Work" folder, persisted so an
// arrangement survives a reload (the default zustand storage is localStorage).
//
// `positions` is an OVERRIDE map, not a full layout: it only holds icons the
// visitor has actually dragged. Anything missing falls back to the computed
// default arrangement in Finder/layout.js, which is what makes "Reset Layout"
// a one-liner and gives a newly added project a sensible slot for free.
//
// Kept deliberately separate from useOsStore: that store holds live zIndex /
// fullscreen state plus a module-scoped zCounter that lives outside state, so
// persisting it would mean restoring z-indexes the counter knows nothing about.
export const useFinderLayoutStore = create(
  persist(
    (set) => ({
      positions: {}, // { [projectId]: { x, y } } — canvas pixels, unclamped

      setPosition: (id, position) =>
        set((state) => ({ positions: { ...state.positions, [id]: position } })),

      // "Clean Up": write an explicit tidy grid for every project.
      setPositions: (positions) => set({ positions }),

      // "Reset Layout": drop every override so the defaults come back.
      resetPositions: () => set({ positions: {} }),
    }),
    {
      name: FINDER_LAYOUT_STORAGE_KEY,
      version: 1,
      // Only the position map is ever written to storage.
      partialize: (state) => ({ positions: state.positions }),
      // Anything older or malformed is discarded rather than guessed at; the
      // worst case is losing one hand-made arrangement.
      migrate: (persisted, version) =>
        version === 1 && persisted && typeof persisted.positions === "object"
          ? persisted
          : { positions: {} },
    }
  )
);
