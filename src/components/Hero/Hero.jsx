import "./hero.scss";
import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <div className="textContainer">
          <h2>Behnam Sepehri</h2>
          <h1>Front-End Developer</h1>
          <div className="buttons">
            <button>See The Latest Work</button>
            <button>Contact Me</button>
          </div>
          <img src="/scroll.png" alt="" />
        </div>
      </div>
      <div className="imageContainer">
        <img src="hero.png" />
      </div>
    </div>
  );
};

export default Hero;
