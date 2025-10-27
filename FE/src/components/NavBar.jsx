import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove JWT
    navigate("/"); // Redirect to login
  };

  return (
    <div className="NavBar">
      <div className="logo">
        <img src="src/assets/Ellipse 88.svg" alt="Logo" />
        <h2>
          <Link to={token ? "/Home" : "/"}>SwoledBros</Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to={token ? "/Home" : "/"}>Home</Link>
        </li>
        <li>
          <Link to="/AboutUs">About us</Link>
        </li>
        <li>
          <Link to={token ? "/Contact" : "/"}>Contact</Link>
        </li>
        <li>
          <Link to={token ? "/Admin" : "/"}>Admin</Link>
        </li>
        <li>
          <Link to={token ? "/Dashboard" : "/"}>Dashboard</Link>
        </li>
      </ul>
      <div className="bt">
        {token ? (
          <button
            onClick={handleLogout}
            style={{ background: "white", color: "black" }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/")}
              style={{ background: "white", color: "black" }}
            >
              Log in
            </button>
            <button onClick={() => navigate("/SignUp")}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
