import { motion } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { MOBILE_APPS } from "../registry";
import TabBar from "../ios/TabBar";
import NavStack from "./NavStack";
import { zoomFrom, ZOOM_TO, ZOOM_TRANSITION } from "./zoom";
import { pushMarker } from "./history";

// One open app, filling the screen. Owns the launch/close zoom, because
// framer-motion 10's AnimatePresence does not propagate exits to nested
// presences — so the animation has to live at this level, not inside NavStack.
const AppLayer = ({ appId, launchRect, bottomInset, reduceMotion }) => {
  const app = MOBILE_APPS[appId];
  const stack = useMobileStore((s) => s.stacks[appId]);
  const setTab = useMobileStore((s) => s.setTab);
  const popToRoot = useMobileStore((s) => s.popToRoot);

  if (!app || !stack) return null;

  const entries = stack.byTab[stack.tab];

  const tabs = app.tabs ? (
    <TabBar
      items={app.tabs}
      active={stack.tab}
      onChange={(id) => {
        // Tapping the active tab returns to its root, iOS-style. Switching
        // tabs is a lateral move, so it pushes a history marker like any
        // other forward navigation.
        if (id === stack.tab) popToRoot();
        else {
          pushMarker();
          setTab(id);
        }
      }}
    />
  ) : null;

  const initial = reduceMotion ? { opacity: 0 } : zoomFrom(launchRect);
  const exit = reduceMotion ? { opacity: 0 } : zoomFrom(launchRect);

  return (
    <motion.div
      initial={initial}
      animate={reduceMotion ? { opacity: 1 } : ZOOM_TO}
      exit={exit}
      transition={reduceMotion ? { duration: 0 } : ZOOM_TRANSITION}
      style={{ transformOrigin: "center", willChange: "transform" }}
      className="absolute inset-0 z-30 overflow-hidden bg-ios-grouped"
    >
      <NavStack
        appId={appId}
        entries={entries}
        tabs={tabs}
        bottomInset={bottomInset}
        reduceMotion={reduceMotion}
      />
    </motion.div>
  );
};

export default AppLayer;
