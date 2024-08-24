import React from "react";
import "./app.scss";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/Hero/Hero";
const App = () => {
  return (
    <div>
      <section id="HomePage">
        <NavBar />
        <Hero />
      </section>
      <section id="Services">Services</section>
      <section id="Portfolio">Portfolio1</section>
      <section id="Contact">Portfolio1</section>
      <section id="About">About</section>
    </div>
  );
};

export default App;
