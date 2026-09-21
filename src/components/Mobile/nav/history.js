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

// How many of our markers are still on the stack. Going home has to unwind
// ALL of them at once, so it needs a count rather than a single back().
let markers = 0;

// Set while a history.go(-n) issued by requestHome is in flight, so the
// popstate it produces closes the app instead of popping one screen.
let homing = false;

export const pushMarker = () => {
  markers += 1;
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

// Straight to the home screen from any depth, the way the iOS home gesture
// works. Unwinds every marker in one traversal so the browser's own back
// button cannot walk back into the app we just closed.
export const requestHome = () => {
  if (markers > 0 && window.history.state?.iosNav) {
    homing = true;
    window.history.go(-markers);
  } else {
    markers = 0;
    useMobileStore.getState().goHome();
  }
};

export const installHistoryBridge = () => {
  const onPopState = () => {
    // A go(-n) traversal fires one popstate, not n. Any extra a browser does
    // fire lands here with homing already false and no app open, and back()
    // no-ops in that state.
    if (homing) {
      homing = false;
      markers = 0;
      useMobileStore.getState().goHome();
      return;
    }
    markers = Math.max(0, markers - 1);
    useMobileStore.getState().back();
  };
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
};
