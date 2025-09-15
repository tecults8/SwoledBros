import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function NavBar() {
  return (
    <div className="NavBar">
      <h2>
        <Link to={"/"}>SwoledBros</Link>
      </h2>
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
    </div>
  );
}

export default NavBar;
