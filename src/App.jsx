import React from "react";
import "./app.scss";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/Hero/Hero";
import Parallex from "./components/Parallex/Parallex";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import Cursor from "./components/Cursor/Cursor";
const App = () => {
  return (
    <div>
      <Cursor />
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
        {" "}
        <Portfolio />{" "}
      </section>
      <section id="Contact">
        <Contact />
      </section>
    </div>
  );
};

export default App;
