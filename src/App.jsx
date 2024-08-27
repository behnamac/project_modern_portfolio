import React from "react";
import "./app.scss";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/Hero/Hero";
import Parallex from "./components/Parallex/Parallex";
import Services from "./components/Services/Services";
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
      <section id="Portfolio">
        <Parallex type="potfolio" />
      </section>
      <section id="Contact">Portfolio1</section>
      <section id="About">About</section>
    </div>
  );
};

export default App;
