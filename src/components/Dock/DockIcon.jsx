import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const DockIcon = ({ mouseX, onClick, label, children, active }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    if (val === null || !ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const widthSync = useTransform(distance, [-160, 0, 160], [42, 74, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <div className="group relative flex flex-col items-center">
      <motion.button
        ref={ref}
        onClick={onClick}
        style={{ width, height: width }}
        className="flex items-center justify-center rounded-xl"
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
      <span
        className={`pointer-events-none absolute -bottom-1.5 h-1 w-1 rounded-full bg-black/60 dark:bg-white/70 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="pointer-events-none absolute -top-8 scale-0 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
};

export default DockIcon;
