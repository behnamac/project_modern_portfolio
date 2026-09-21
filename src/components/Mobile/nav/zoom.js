// The iOS app-launch zoom: the window grows out of the icon that was tapped.
//
// Scale is UNIFORM (width-derived) rather than matched per axis — scaling a
// full-screen layer to an icon's aspect ratio visibly squashes the nav bar
// text mid-flight. The border radius is pre-divided by the scale so that
// after the transform it lands at the icon's actual corner size.
export const zoomFrom = (rect) => {
  if (!rect || typeof window === "undefined") {
    return { opacity: 0, scale: 0.92, x: 0, y: 0, borderRadius: 0 };
  }

  const scale = rect.width / window.innerWidth;

  return {
    opacity: 0,
    scale,
    x: rect.left + rect.width / 2 - window.innerWidth / 2,
    y: rect.top + rect.height / 2 - window.innerHeight / 2,
    borderRadius: scale > 0 ? 13.4 / scale : 0,
  };
};

export const ZOOM_TO = { opacity: 1, scale: 1, x: 0, y: 0, borderRadius: 0 };

// Opacity resolves well before the spring settles, which is what hides the
// fact that the geometry is an approximation rather than a real morph.
export const ZOOM_TRANSITION = {
  type: "spring",
  stiffness: 224,
  damping: 28,
  mass: 1,
  opacity: { duration: 0.14 },
};
