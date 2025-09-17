import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function NavBar() {
  return (
    <div className="NavBar">
      <div className="logo">
        {" "}
        <img src="src\assets\Ellipse 88.svg" alt="" />
        <h2>
          <Link to={"/"}>SwoledBros</Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
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
      </ul>
      <div className="bt">
        <button style={{ background: "white", color: "black" }}>Log in</button>
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default NavBar;
