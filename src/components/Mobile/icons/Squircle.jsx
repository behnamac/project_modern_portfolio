import { useId } from "react";

// The iOS app-icon outline: a CONTINUOUS (superelliptical) corner, not a
// circular arc. Corner radius is 22.37% of the width; each corner is drawn as
// three beziers so the curvature ramps in smoothly instead of meeting the
// straight edge at a tangent discontinuity.
//
// `border-radius: 22.37%` would be one line, but it draws circular corners —
// the "pillowy" look that reads as not-quite-iOS next to the real thing.
// Since every app icon here is already inline SVG, the true path is free.
export const SQUIRCLE_PATH =
  "M 0 34.196 C 0 24.35 0 19.426 1.676 14.127 C 3.782 8.34 8.34 3.782 14.127 1.676 " +
  "C 19.426 0 24.35 0 34.196 0 L 65.804 0 C 75.65 0 80.574 0 85.873 1.676 " +
  "C 91.66 3.782 96.218 8.34 98.324 14.127 C 100 19.426 100 24.35 100 34.196 " +
  "L 100 65.804 C 100 75.65 100 80.574 98.324 85.873 C 96.218 91.66 91.66 96.218 85.873 98.324 " +
  "C 80.574 100 75.65 100 65.804 100 L 34.196 100 C 24.35 100 19.426 100 14.127 98.324 " +
  "C 8.34 96.218 3.782 91.66 1.676 85.873 C 0 80.574 0 75.65 0 65.804 Z";

// Shared shell for every app icon: squircle background with a vertical
// gradient (lighter on top, as iOS does), the glyph clipped to the same
// shape, and a hairline so a white icon stays legible in light mode and a
// near-black one stays legible on a black home screen.
//
// Keeps the project's icon sizing contract: h-full w-full, sized by the
// parent's <span className="h-[60px] w-[60px]">.
const Squircle = ({ from, to, dark = false, title, children }) => {
  // useId() emits colons, which are invalid inside url(#...). Duplicate <defs>
  // ids across the many places an icon renders would otherwise collide and
  // silently resolve to the wrong gradient.
  const raw = useId().replace(/:/g, "");
  const gradientId = `sq-g-${raw}`;
  const clipId = `sq-c-${raw}`;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={title}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={SQUIRCLE_PATH} />
        </clipPath>
      </defs>
      <path d={SQUIRCLE_PATH} fill={`url(#${gradientId})`} />
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <path
        d={SQUIRCLE_PATH}
        fill="none"
        strokeWidth="1"
        stroke={dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"}
      />
    </svg>
  );
};

export default Squircle;
