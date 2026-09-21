import { motion, useMotionValue, useTransform } from "framer-motion";
import Pressable from "./Pressable";
import { ChevronLeft } from "../icons/Glyphs";

// iOS navigation bar. Two variants sharing one component:
//   large  - 44pt row + a 52pt large-title row, transparent until scrolled
//   inline - just the 44pt row, material always on
//
// When `scrollY` is supplied the large title shrinks into the inline title as
// the content scrolls, which is the behaviour that makes a page feel native.
const NavBar = ({ title, back, trailing, large = false, scrollY }) => {
  // useTransform needs a MotionValue to read from; with no scroll context the
  // bar just stays in its resting state.
  const fallback = useMotionValue(0);
  const y = scrollY || fallback;

  const chromeOpacity = useTransform(y, [0, 8], large ? [0, 1] : [1, 1]);
  const largeOpacity = useTransform(y, [0, 40, 52], [1, 0.4, 0]);
  const largeShift = useTransform(y, [0, 52], [0, -12]);
  const inlineOpacity = useTransform(y, [24, 52], large ? [0, 1] : [1, 1]);
  const inlineShift = useTransform(y, [24, 52], large ? [8, 0] : [0, 0]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <motion.div
        style={{ opacity: chromeOpacity }}
        className="absolute inset-0 bg-ios-chrome-nav backdrop-blur-ios backdrop-saturate-150 ios-hairline-b"
      />

      <div className="pointer-events-auto relative flex h-11 items-center px-2">
        <div className="flex min-w-0 flex-1 items-center justify-start">
          {back && (
            <Pressable
              variant="fade"
              onClick={back.onPress}
              aria-label={`Back to ${back.label}`}
              className="-ml-1 flex h-11 items-center gap-[3px] pl-1 pr-2 text-ios-blue"
            >
              <ChevronLeft className="h-[22px] w-[22px]" />
              <span className="max-w-[9rem] truncate text-ios-body">{back.label}</span>
            </Pressable>
          )}
        </div>

        <motion.span
          style={{ opacity: inlineOpacity, y: inlineShift }}
          className="max-w-[55%] truncate px-1 text-center text-ios-headline text-ios-label"
        >
          {title}
        </motion.span>

        <div className="flex min-w-0 flex-1 items-center justify-end">{trailing}</div>
      </div>

      {large && (
        <motion.h1
          style={{ opacity: largeOpacity, y: largeShift }}
          className="pointer-events-none origin-left px-4 pb-1.5 text-ios-large-title text-ios-label"
        >
          {title}
        </motion.h1>
      )}
    </div>
  );
};

export default NavBar;
