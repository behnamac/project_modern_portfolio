import { useEffect } from "react";
import { motion } from "framer-motion";
import { useOsStore } from "@/store/useOsStore";
import Wallpaper from "@/components/Desktop/Wallpaper";

const BootScreen = () => {
  const finishBoot = useOsStore((s) => s.finishBoot);

  useEffect(() => {
    const id = setTimeout(finishBoot, 2400);
    return () => clearTimeout(id);
  }, [finishBoot]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[2000] flex items-center justify-center"
    >
      <Wallpaper />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-white"
      >
        <p className="text-lg tracking-wide opacity-90">Hey, welcome to my</p>
        <p className="font-signature text-6xl sm:text-7xl">portfolio</p>
      </motion.div>
    </motion.div>
  );
};

export default BootScreen;
