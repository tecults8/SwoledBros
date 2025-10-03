import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="NavBar">
      <div className="logo">
        {" "}
        <img src="src\assets\Ellipse 88.svg" alt="" />
        <h2>
          <Link to={"/Home"}>SwoledBros</Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to={"/Home"}>Home</Link>
        </li>
        <li>
          <Link to={"/AboutUs"}>About us</Link>
        </li>
        <li>
          <Link to={"/Contact"}>Contact</Link>
        </li>
        <li>
          <Link to={"/Admin"}>Admin</Link>
        </li>
        <li>
          <Link to={"/Dashboard"}>Dashboard</Link>
        </li>
      </ul>
      <div className="bt">
        <button
          onClick={() => navigate("/Login")}
          style={{ background: "white", color: "black" }}
        >
          Log in
        </button>
        <button onClick={() => navigate("/SignUp")}>Sign up</button>
      </div>
    </div>
  );
}

export default NavBar;
