import { useOsStore } from "@/store/useOsStore";

// Shared by the desktop, the boot screen and the mobile shell, so the artwork
// only has to be set here. The gradient stays underneath the image as the
// paint-before-load (and load-failure) colour, so the menu bar and desktop
// icons are never white-on-white for the frame or two before the PNG arrives.
const Wallpaper = () => {
  const theme = useOsStore((s) => s.theme);
  const dark = theme === "dark";

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500"
      style={{
        background: dark
          ? "radial-gradient(120% 100% at 15% 0%, #2a2470 0%, #14163f 35%, #05061a 100%)"
          : "radial-gradient(120% 100% at 15% 0%, #a9c9ff 0%, #6f8fe0 40%, #2f4fb0 100%)",
      }}
    >
      <img
        src="/images/wallpaper.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        draggable={false}
      />
      {/* Dark mode dims the artwork so window chrome and the dock's glass keep
          their contrast against it; light mode leaves it at full strength. */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "rgba(3, 4, 18, 0.45)",
          opacity: dark ? 1 : 0,
        }}
      />
    </div>
  );
};

export default Wallpaper;
