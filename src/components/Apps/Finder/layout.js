import { PROJECTS } from "@/constants";

// Must match the box ProjectFolderIcon actually renders: a 56px glyph plus a
// label that can wrap to two lines, inside p-2.
export const ICON_W = 104;
export const ICON_H = 104;

const ORIGIN = { x: 28, y: 22 };
const STEP_X = 140;
const STEP_Y = 126;

// Deterministic "hand-placed" offsets. The default arrangement should read as
// scattered, the way a real folder does — but it has to be identical on every
// reload and every "Reset Layout", so this is a fixed table rather than
// Math.random().
const JITTER = [
  { x: 0, y: 0 },
  { x: 18, y: 26 },
  { x: -8, y: 12 },
  { x: 24, y: -6 },
  { x: 6, y: 30 },
  { x: -14, y: 8 },
];

export const clampPosition = (position, width, height) => ({
  x: Math.min(Math.max(position.x, 0), Math.max(0, width - ICON_W)),
  y: Math.min(Math.max(position.y, 0), Math.max(0, height - ICON_H)),
});

// tidy: false -> the staggered default arrangement ("Reset Layout")
// tidy: true  -> a straight grid ("Clean Up")
export const defaultLayout = (width, height, { tidy = false } = {}) => {
  const columns = Math.max(1, Math.floor((width - ORIGIN.x) / STEP_X));
  const positions = {};

  PROJECTS.forEach((project, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const offset = tidy ? { x: 0, y: 0 } : JITTER[index % JITTER.length];

    positions[project.id] = clampPosition(
      {
        x: ORIGIN.x + column * STEP_X + offset.x,
        y: ORIGIN.y + row * STEP_Y + offset.y,
      },
      width,
      height
    );
  });

  return positions;
};
