import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
function NavBar() {
  return (
    <div className="NavBar">
      <h2>SwoledBros</h2>
      <ul>
        <li>
          <Link to={"/"}>HOME</Link>
        </li>
        <li>
          <Link to={"/DietPlan"}>DIET_PLAN</Link>
        </li>
        <li>
          <Link to={"/TrainingPlan"}>TRAINING_PLAN</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
