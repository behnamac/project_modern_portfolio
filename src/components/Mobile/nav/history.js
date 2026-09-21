import { useMobileStore } from "@/store/useMobileStore";

// Browser-history bridge.
//
// Forward moves push a marker; every backwards move calls history.back() and
// lets the popstate handler do the actual pop. One direction of data flow, so
// Android's back button, the nav chevron and the swipe gesture cannot each
// pop a level for the same intent.
//
// pushMarker is only ever called from store actions (i.e. from real events),
// never an effect: StrictMode double-invokes effects in dev and would push
// two entries per navigation.

export const pushMarker = () => {
  window.history.pushState({ iosNav: true }, "");
};

export const requestBack = () => {
  if (window.history.state?.iosNav) {
    window.history.back();
  } else {
    // Landed here without a marker (fresh load, or the marker was consumed).
    // Mutate directly rather than leaving the UI wedged.
    useMobileStore.getState().back();
  }
};

export const installHistoryBridge = () => {
  const onPopState = () => useMobileStore.getState().back();
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
};
