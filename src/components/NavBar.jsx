import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/DietPlan"}>DIET_PLAN</Link>
      <br />
      <Link to={"/TrainingPlan"}>TRAINING_PLAN</Link>
    </div>
  );
}

export default NavBar;
