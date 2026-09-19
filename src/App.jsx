import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import BootScreen from "@/components/Boot/BootScreen";
import Desktop from "@/components/Desktop/Desktop";
import MobileApp from "@/components/Mobile/MobileApp";

const App = () => {
  const booted = useOsStore((s) => s.booted);
  const theme = useOsStore((s) => s.theme);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="h-full w-full">
      <AnimatePresence>{!booted && <BootScreen key="boot" />}</AnimatePresence>
      {booted && (isMobile ? <MobileApp /> : <Desktop />)}
    </div>
  );
};

export default App;
