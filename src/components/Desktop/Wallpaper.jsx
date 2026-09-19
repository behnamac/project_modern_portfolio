import { useOsStore } from "@/store/useOsStore";

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
      <div
        className="absolute -left-1/4 top-1/4 h-[70vh] w-[140vw] rotate-[-8deg] blur-3xl"
        style={{
          background: dark
            ? "linear-gradient(100deg, rgba(99,102,241,0.55), rgba(30,41,120,0.15))"
            : "linear-gradient(100deg, rgba(255,255,255,0.5), rgba(120,150,255,0.1))",
        }}
      />
      <div
        className="absolute -right-1/4 bottom-0 h-[60vh] w-[130vw] rotate-[6deg] blur-3xl"
        style={{
          background: dark
            ? "linear-gradient(100deg, rgba(30,58,138,0.7), rgba(10,10,30,0))"
            : "linear-gradient(100deg, rgba(191,227,255,0.7), rgba(120,160,255,0))",
        }}
      />
    </div>
  );
};

export default Wallpaper;
