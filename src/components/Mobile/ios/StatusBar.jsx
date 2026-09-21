import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SignalBars, WifiGlyph, BatteryGlyph } from "../icons/Glyphs";

// The simulated iOS status bar, with the visitor's real time rather than a
// frozen 9:41. Ticks on the minute boundary instead of every 60s from mount,
// so the displayed minute is never up to 59s stale.
const useMinuteClock = () => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    let timer;
    const schedule = () => {
      const delay = 60000 - (Date.now() % 60000);
      timer = setTimeout(() => {
        setNow(dayjs());
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return now;
};

// `tone="light"` forces white glyphs for the home screen (over the wallpaper)
// and Terminal, which are dark regardless of theme.
const StatusBar = ({ tone = "auto" }) => {
  const now = useMinuteClock();

  return (
    <div
      className={`relative z-20 flex h-5 shrink-0 items-center justify-between pl-[22px] pr-5 ${
        tone === "light" ? "text-white" : "text-ios-label"
      }`}
    >
      <span className="w-[54px] text-center text-[15px] font-semibold tracking-[-0.02em]">
        {now.format("H:mm")}
      </span>
      <div className="flex items-center gap-[5px]">
        <SignalBars />
        <WifiGlyph />
        <BatteryGlyph />
      </div>
    </div>
  );
};

export default StatusBar;
