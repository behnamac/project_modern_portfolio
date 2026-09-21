import { useEffect } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { useSafeArea } from "@/hooks/useSafeArea";
import { MOBILE_APPS } from "./registry";
import StatusBar from "./ios/StatusBar";
import HomeIndicator from "./ios/HomeIndicator";
import HomeScreen from "./home/HomeScreen";
import AppLayer from "./nav/AppLayer";
import { useHomeGesture } from "./nav/useHomeGesture";
import { installHistoryBridge, pushMarker, requestHome } from "./nav/history";

// The phone.
//
// Laid out as three shell rows — status bar, content, home indicator — so an
// app's tab bar (absolute to the content row) can never sit under the home
// indicator, and neither can ever overlap the other. That also makes the
// indicator row a clean strip below the tab bar, which is what the
// swipe-up-to-home gesture grabs.
const MobileApp = () => {
  const activeApp = useMobileStore((s) => s.activeApp);
  const launchRect = useMobileStore((s) => s.launchRect);
  const openApp = useMobileStore((s) => s.openApp);
  const clearLaunchRect = useMobileStore((s) => s.clearLaunchRect);
  const reduceMotion = useReducedMotion();
  const safeArea = useSafeArea();

  // Owned here rather than in AppLayer: the panel it moves and the indicator
  // that starts it are siblings, not parent and child.
  const dismiss = useHomeGesture({ enabled: Boolean(activeApp), reduceMotion });

  useEffect(() => installHistoryBridge(), []);

  // A real notched device already draws both of these outside the viewport;
  // drawing our own there would show the clock twice.
  const drawStatusBar = safeArea.top < 20;
  const drawHomeIndicator = safeArea.bottom < 10;

  const handleOpen = (appId, rect) => {
    // Belt and braces: the exit reset below normally clears this, but a tap
    // that lands mid-exit would otherwise launch the app already displaced.
    dismiss.reset();
    pushMarker();
    openApp(appId, rect, MOBILE_APPS[appId]);
  };

  return (
    <div
      className="ios-root font-ios flex flex-col antialiased"
      style={{ paddingTop: safeArea.top, paddingBottom: safeArea.bottom }}
    >
      {drawStatusBar && <StatusBar tone={activeApp ? "auto" : "light"} />}

      <div className="relative flex-1 overflow-hidden">
        <HomeScreen
          appOpen={Boolean(activeApp)}
          dismissProgress={dismiss.progress}
          onOpen={handleOpen}
          onSearch={() => handleOpen("files")}
          reduceMotion={reduceMotion}
        />

        <AnimatePresence
          onExitComplete={() => {
            clearLaunchRect();
            dismiss.reset();
          }}
        >
          {activeApp && (
            <AppLayer
              key={activeApp}
              appId={activeApp}
              launchRect={launchRect}
              bottomInset={0}
              reduceMotion={reduceMotion}
              dismiss={dismiss.panel}
            />
          )}
        </AnimatePresence>
      </div>

      {drawHomeIndicator ? (
        <button
          type="button"
          {...dismiss.handlers}
          onClick={activeApp ? requestHome : undefined}
          aria-label={activeApp ? "Go to home screen" : undefined}
          disabled={!activeApp}
          className="shrink-0 touch-none"
        >
          <HomeIndicator tone={activeApp ? "auto" : "light"} />
        </button>
      ) : (
        // The device draws its own indicator below the viewport, so there is
        // no row to grab. Stand in with a strip over the safe-area padding —
        // best effort, since iOS claims that edge for its own home gesture.
        activeApp && (
          <div
            {...dismiss.handlers}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-50 touch-none"
            style={{ height: safeArea.bottom }}
          />
        )
      )}
    </div>
  );
};

export default MobileApp;
