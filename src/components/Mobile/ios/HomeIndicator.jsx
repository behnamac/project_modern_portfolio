// The bottom pill. Drawn only when the device does not already draw its own
// (see useSafeArea) — otherwise a real iPhone would show two.
const HomeIndicator = ({ tone = "auto" }) => (
  <div className="pointer-events-none relative z-20 flex h-[34px] shrink-0 items-end justify-center pb-2">
    <span
      className={`h-[5px] w-[134px] rounded-full ${
        tone === "light" ? "bg-white/40" : "bg-ios-home-ind"
      }`}
    />
  </div>
);

export default HomeIndicator;
