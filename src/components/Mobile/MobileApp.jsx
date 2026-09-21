import { useEffect } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useMobileStore } from "@/store/useMobileStore";
import { useSafeArea } from "@/hooks/useSafeArea";
import { MOBILE_APPS } from "./registry";
import StatusBar from "./ios/StatusBar";
import HomeIndicator from "./ios/HomeIndicator";
import HomeScreen from "./home/HomeScreen";
import AppLayer from "./nav/AppLayer";
import { installHistoryBridge, pushMarker, requestBack } from "./nav/history";

// The phone.
//
// Laid out as three shell rows — status bar, content, home indicator — so an
// app's tab bar (absolute to the content row) can never sit under the home
// indicator, and neither can ever overlap the other.
const MobileApp = () => {
  const activeApp = useMobileStore((s) => s.activeApp);
  const launchRect = useMobileStore((s) => s.launchRect);
  const openApp = useMobileStore((s) => s.openApp);
  const clearLaunchRect = useMobileStore((s) => s.clearLaunchRect);
  const reduceMotion = useReducedMotion();
  const safeArea = useSafeArea();

  useEffect(() => installHistoryBridge(), []);

  // A real notched device already draws both of these outside the viewport;
  // drawing our own there would show the clock twice.
  const drawStatusBar = safeArea.top < 20;
  const drawHomeIndicator = safeArea.bottom < 10;

  const handleOpen = (appId, rect) => {
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
          onOpen={handleOpen}
          onSearch={() => handleOpen("files")}
          reduceMotion={reduceMotion}
        />

        <AnimatePresence onExitComplete={clearLaunchRect}>
          {activeApp && (
            <AppLayer
              key={activeApp}
              appId={activeApp}
              launchRect={launchRect}
              bottomInset={0}
              reduceMotion={reduceMotion}
            />
          )}
        </AnimatePresence>
      </div>

      {drawHomeIndicator && (
        <button
          type="button"
          onClick={activeApp ? requestBack : undefined}
          aria-label={activeApp ? "Go to home screen" : undefined}
          disabled={!activeApp}
          className="shrink-0"
        >
          <HomeIndicator tone={activeApp ? "auto" : "light"} />
        </button>
      )}
    </div>
  );
};

export default MobileApp;
