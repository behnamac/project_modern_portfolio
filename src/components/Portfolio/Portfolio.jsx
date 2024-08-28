import "./Portfolio.scss";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const items = [
  {
    id: 1,
    title: "React commerce",
    img: "https://i.pinimg.com/736x/1c/7f/04/1c7f04f277f32f4ba55aedac4695221d.jpg",
  },
  {
    id: 2,
    title: "Nextjs Blog",
    img: "https://cdn.dribbble.com/userupload/16297929/file/original-51fa9766d501a967f745b6f814a6d972.png?resize=752x",
  },
  {
    id: 3,
    title: "Vanila  JS App",
    img: "https://dribbble.com/shots/18583890/attachments/13779589?mode=media",
  },
  {
    id: 4,
    title: "Music App",
    img: "https://cdn.dribbble.com/userupload/12337377/file/original-64f89a9cecf8603cafa1bdf9669b54a4.png?resize=752x",
  },
];
const Single = ({ item }) => {
  return <section>{item.title}</section>;
};

const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="portfolio">
      <div className="progress">
        <h1>Feature Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
