// iOS chrome geometry. Points map 1:1 to CSS pixels.
export const METRICS = {
  statusBar: 20, // content row height; safe-area padding is added on top
  navBar: 44,
  largeTitle: 52, // the extra row under the 44pt bar
  tabBar: 49,
  homeIndicator: 34, // space reserved when the device reserves none
  searchField: 36,
  listRow: 44,
  appIcon: 60,
  dockIcon: 60,
  tabIcon: 26,
};

// SwiftUI spring(duration:bounce:) converted for framer-motion:
//   stiffness = (2pi/duration)^2,  damping = 2*(1-bounce)*(2pi/duration)
export const SPRING = {
  nav: { type: "spring", stiffness: 224, damping: 30, mass: 1 },
  launch: { type: "spring", stiffness: 224, damping: 28, mass: 1 },
  snappy: { type: "spring", stiffness: 158, damping: 21, mass: 1 },
  sheet: { type: "spring", stiffness: 131, damping: 21, mass: 1 },
};

// Screens slide in from the right; the one behind shifts a third of the way
// left and dims. `custom` carries the direction (1 = push, -1 = pop).
export const SCREEN_VARIANTS = {
  enter: (d) => ({ x: d >= 0 ? "100%" : "-30%" }),
  center: { x: "0%" },
  exit: (d) => ({ x: d >= 0 ? "-30%" : "100%" }),
};
