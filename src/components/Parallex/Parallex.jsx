
import { useRef } from "react";
import "./Parallex.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Parallex = ({ type }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const YText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  const backGroundType = {
    background:
      type === "portfolio"
        ? "linear-gradient(180deg, #111132, #0c0c1d)"
        : "linear-gradient(180deg, #111132, #505064)",
  };

  return (
    <div className="parallex" ref={ref} style={backGroundType}>
      <motion.h1 style={{ y: YText }}>
        {type === "portfolio" ? "What I do?" : "What I did?"}
      </motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          y: yBg,
          backgroundImage: `url(${
            type === "portfolio" ? "./planets.png" : "./planets2.png"
          })`,
        }}
      ></motion.div>
      <motion.div className="stars" style={{ x: yBg }}></motion.div>
    </div>
  );
};

export default Parallex;
