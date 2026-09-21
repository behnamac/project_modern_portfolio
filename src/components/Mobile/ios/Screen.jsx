import { cloneElement, isValidElement, useRef } from "react";
import { useScroll } from "framer-motion";
import { METRICS } from "../metrics";

// One pushed screen: a scroll container with the nav bar fixed over it and an
// optional tab bar under it. Scrolling happens HERE, never on the page, so
// mobile Safari's pull-to-refresh can't reload the "app" mid-gesture.
//
// The nav bar needs the scroll position to collapse its large title, so the
// scrollY MotionValue is handed to it by cloning rather than context — there
// is only ever one nav bar per screen.
const Screen = ({
  nav,
  tabs,
  background = "grouped",
  topInset = 0,
  bottomInset = 0,
  children,
}) => {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  const large = isValidElement(nav) && nav.props.large;
  const navHeight = nav ? METRICS.navBar + (large ? METRICS.largeTitle : 0) : 0;
  const tabHeight = tabs ? METRICS.tabBar + bottomInset : bottomInset;

  const surface =
    background === "grouped"
      ? "bg-ios-grouped"
      : background === "plain"
      ? "bg-ios-bg"
      : "";

  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden ${surface}`}>
      <div className="relative flex-1 overflow-hidden" style={{ paddingTop: topInset }}>
        {nav && cloneElement(nav, { scrollY })}

        <div
          ref={scrollRef}
          className="ios-scroll h-full overflow-y-auto"
          style={{ paddingTop: navHeight, paddingBottom: tabHeight }}
        >
          {children}
        </div>

        {tabs && cloneElement(tabs, { bottomInset })}
      </div>
    </div>
  );
};

export default Screen;
