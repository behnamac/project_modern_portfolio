import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wallpaper from "@/components/Desktop/Wallpaper";
import { PROFILE, DOCK_APPS } from "@/constants";
import { APP_REGISTRY } from "@/components/Apps/registry";
import { useOsStore } from "@/store/useOsStore";
import { PdfIcon, ControlGlyph } from "@/components/icons";

const HOME_ITEMS = [...DOCK_APPS, { id: "resume", name: "Résumé" }];

const MobileApp = () => {
  const [open, setOpen] = useState(null);
  const toggleTheme = useOsStore((s) => s.toggleTheme);

  const def = open ? APP_REGISTRY[open] : null;
  const Content = def?.component;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <Wallpaper />

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex h-full flex-col px-5 pt-12"
          >
            <div className="mb-6 flex items-center justify-between text-white">
              <div>
                <p className="font-signature text-4xl leading-none">portfolio</p>
                <p className="mt-1 text-sm opacity-80">
                  {PROFILE.name} · {PROFILE.title}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="rounded-full bg-white/15 p-2 backdrop-blur"
                aria-label="Toggle theme"
              >
                <ControlGlyph />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {HOME_ITEMS.map((item) => {
                const appDef = APP_REGISTRY[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => setOpen(item.id)}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white/15 p-4 text-white backdrop-blur-md active:scale-95"
                  >
                    <span className="h-10 w-10">
                      {item.id === "resume" ? <PdfIcon /> : appDef.dockIcon || appDef.icon}
                    </span>
                    <span className="text-xs font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute inset-0 flex flex-col bg-[#f4f4f5] dark:bg-[#151517]"
          >
            <div className="flex h-14 shrink-0 items-center gap-2 border-b border-black/10 bg-white/70 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
              <button
                onClick={() => setOpen(null)}
                className="text-sm font-medium text-blue-500"
              >
                &larr; Go back
              </button>
              <span className="mx-auto -ml-10 text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {def.title}
              </span>
            </div>
            <div className="mac-scroll flex-1 overflow-auto text-[#1d1d1f] dark:text-white">
              {Content && <Content />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileApp;
