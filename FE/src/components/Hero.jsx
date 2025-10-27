import React from "react";
import "./Hero.css";
import '../pages/Dashboard';
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="Hero">
      <h1 className="HeroCaption">
        Get Your Health Upto Game <br /> With Us.
      </h1>
      <div className="lgsbt">
        <button onClick={() => {
          navigate("/dashboard");
        }}>Lets get Started</button>
      </div>
    </div>
  );
}

export default Hero;
