import { useState, useEffect } from "react";
import "./Cursor.scss";
import { motion } from "framer-motion";

const Cursor = () => {
  const [postion, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  return (
    <motion.div
      className="cursor"
      animate={{ x: postion.x + 5, y: postion.y + 5 }}
    ></motion.div>
  );
};

export default Cursor;
