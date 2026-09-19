import Wallpaper from "@/components/Desktop/Wallpaper";
import DesktopIcons from "@/components/Desktop/DesktopIcons";
import MenuBar from "@/components/MenuBar/MenuBar";
import Dock from "@/components/Dock/Dock";
import WindowManager from "@/components/Window/WindowManager";

const Desktop = () => (
  <div className="relative h-full w-full overflow-hidden">
    <Wallpaper />
    <MenuBar />
    <DesktopIcons />
    <WindowManager />
    <Dock />
  </div>
);

export default Desktop;
