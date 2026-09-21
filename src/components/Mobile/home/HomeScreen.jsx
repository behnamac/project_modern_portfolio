import { motion } from "framer-motion";
import { MOBILE_APPS, HOME_LAYOUT, DOCK_LAYOUT } from "../registry";
import { SearchGlyph } from "../icons/Glyphs";
import Pressable from "../ios/Pressable";
import Wallpaper from "./Wallpaper";
import AppIconTile from "./AppIconTile";

// The home screen stays MOUNTED while an app is open — scaled up slightly and
// faded — so re-opening is instant, there is no wallpaper flash, and the
// launch reads as depth rather than a cross-fade.
const HomeScreen = ({ appOpen, onOpen, onSearch, reduceMotion }) => (
  <motion.div
    animate={
      reduceMotion
        ? { opacity: appOpen ? 0 : 1 }
        : { scale: appOpen ? 1.08 : 1, opacity: appOpen ? 0 : 1 }
    }
    transition={{ type: "spring", stiffness: 224, damping: 30 }}
    className="absolute inset-0 flex flex-col"
    style={{ pointerEvents: appOpen ? "none" : "auto" }}
    aria-hidden={appOpen}
  >
    <Wallpaper />

    <div className="grid flex-1 grid-cols-4 content-start gap-y-5 px-6 pt-4">
      {HOME_LAYOUT.map((id) => (
        <AppIconTile key={id} app={MOBILE_APPS[id]} onOpen={onOpen} />
      ))}
    </div>

    <div className="flex justify-center pb-3">
      <Pressable
        onClick={onSearch}
        variant="fade"
        className="flex items-center gap-1.5 rounded-full bg-black/25 px-3.5 py-1.5 backdrop-blur-sm"
      >
        <SearchGlyph className="h-3.5 w-3.5 text-white" />
        <span className="text-[13px] text-white">Search</span>
      </Pressable>
    </div>

    <div className="mx-3 mb-2 flex justify-around rounded-[28px] bg-white/20 px-3 py-3 backdrop-blur-xl">
      {DOCK_LAYOUT.map((id) => (
        <AppIconTile key={id} app={MOBILE_APPS[id]} onOpen={onOpen} showLabel={false} />
      ))}
    </div>
  </motion.div>
);

export default HomeScreen;
