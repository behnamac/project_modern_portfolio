import "./hero.scss";
import { motion } from "framer-motion";
import React from "react";

const textVarients = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      straggerChildren: 0.1,
    },
  },
  scrollButton: {
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};
const sliderVarients = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVarients}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVarients}>Behnam Sepehri</motion.h2>
          <motion.h1 variants={textVarients}>Front-End Developer</motion.h1>
          <motion.div className="buttons" variants={textVarients}>
            <motion.button variants={textVarients}>
              See The Latest Work
            </motion.button>
            <motion.button variants={textVarients}>Contact Me</motion.button>
          </motion.div>
          <motion.img
            src="/scroll.png"
            alt=""
            variants={textVarients}
            animate="scrollButton"
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVarients}
        initial="initial"
        animate="animate"
      >
        Creative Game and Web Developer
      </motion.div>
      <div className="imageContainer">
        <img src="hero.png" />
      </div>
    </div>
  );
};

export default Hero;
