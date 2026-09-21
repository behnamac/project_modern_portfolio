import { useState } from "react";
import { NAV_LINKS, PROFILE } from "@/constants";
import { useOsStore } from "@/store/useOsStore";
import { APP_REGISTRY } from "@/components/Apps/registry";
import { LogoMark, WifiGlyph, SearchGlyph, ControlGlyph } from "@/components/icons";
import Clock from "@/components/MenuBar/Clock";

const MenuBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useOsStore((s) => s.theme);
  const setTheme = useOsStore((s) => s.setTheme);
  const openWindow = useOsStore((s) => s.openWindow);
  // Slides out of the way while a window is in (simulated) fullscreen.
  const hidden = useOsStore((s) =>
    s.windows.some((w) => w.fullscreen && !w.minimized)
  );

  const openApp = (appId) => {
    const def = APP_REGISTRY[appId];
    openWindow({ id: appId, app: appId, title: def.title, size: def.size });
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[1000] flex h-8 items-center justify-between border-b border-black/5 bg-[var(--menubar-light)] px-4 text-[13px] font-medium text-[#1d1d1f] backdrop-blur-xl transition duration-300 ease-out dark:border-white/5 dark:bg-[var(--menubar-dark)] dark:text-white ${
        hidden ? "pointer-events-none -translate-y-full opacity-0" : ""
      }`}
    >
      <div className="flex items-center gap-5">
        <span className="text-black/80 dark:text-white/90"><LogoMark /></span>
        <span className="font-semibold">{PROFILE.name.split(" ")[0]}&rsquo;s Portfolio</span>
        <nav className="hidden items-center gap-5 sm:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => openApp(link.app)}
              className="opacity-80 hover:opacity-100"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <WifiGlyph />
        <SearchGlyph />
        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)}>
            <ControlGlyph />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-[1001]"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-6 z-[1002] w-36 overflow-hidden rounded-lg border border-black/10 bg-white/95 py-1 text-[#1d1d1f] shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#2b2b2f]/95 dark:text-white">
                {["light", "dark"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setTheme(mode);
                      setMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-left capitalize hover:bg-blue-500 hover:text-white ${
                      theme === mode ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {mode} Mode {theme === mode && <span>&#10003;</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default MenuBar;
