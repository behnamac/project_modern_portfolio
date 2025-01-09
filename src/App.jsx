import React from "react";
import "./app.scss";
import {
  Navbar,
  Hero,
  Parallex,
  Services,
  Portfolio,
  Contact,
  Cursor,
} from "./components/index.js";

const App = () => {
  return (
    <div>
      <Cursor />
      <section id="HomePage">
        <Navbar />
        <Hero />
      </section>
      <section id="Services">
        <Parallex type="services" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallex type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section>
    </div>
  );
};

export default App;
