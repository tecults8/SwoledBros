import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
