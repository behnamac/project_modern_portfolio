import React from "react";
import "./app.scss";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/Hero/Hero";
import Parallex from "./components/Parallex/Parallex";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
const App = () => {
  return (
    <div>
      <section id="HomePage">
        <NavBar />
        <Hero />
      </section>
      <section id="Parallex">
        <Parallex type="parallex" />
      </section>
      <section id="Services">
        <Services />
      </section>
      <section id="Parallex2">
        <Parallex type="Parallex2" />
      </section>
      <section id="Portfolio">
        <Portfolio />
      </section>
      <section id="Contact">
        <Contact />
      </section>
      <section id="About">About</section>
    </div>
  );
};

export default App;
