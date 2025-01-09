import React from "react";
import { motion } from "framer-motion";

const varients = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.5,
      staggerDirection: -1,
    },
  },
};

const itemVarients = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = () => {
  const items = ["HomePage", "Services", "Portfolio", "Contact"];

  return (
    <motion.div className="links" variants={varients}>
      {items.map((item) => (
        <motion.a
          href={`#${item}`}
          key={item}
          variants={itemVarients}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
        >
          {item}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Links;
