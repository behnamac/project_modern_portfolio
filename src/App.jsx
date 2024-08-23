import React from "react";
import "./app.scss";
import NavBar from "./components/navbar/NavBar";
const App = () => {
  return (
    <div>
      <NavBar />
      <section id="HomePage">Prallex</section>
      <section id="Services">Services</section>
      <section id="Portfolio">Portfolio1</section>
      <section id="Contact">Portfolio1</section>
      <section id="About">About</section>
    </div>
  );
};

export default App;
