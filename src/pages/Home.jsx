import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      {/* <h2>SwoledBros</h2> */}
      <NavBar />
      <Hero />
      {/* <Link to="/DietPlan">DIET_PLAN</Link> */}
      <Footer />
    </div>
  );
}

export default Home;
