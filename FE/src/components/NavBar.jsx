import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <img src="src/assets/Ellipse 88.svg" alt="Logo" />
          <h2>
            <Link to={token ? "/Home" : "/"}>SwoledBros</Link>
          </h2>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={menuOpen ? "bar open" : "bar"}></div>
          <div className={menuOpen ? "bar open" : "bar"}></div>
          <div className={menuOpen ? "bar open" : "bar"}></div>
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>
            <Link to={token ? "/Home" : "/"} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
       
          {user?.isAdmin && <li>
            <Link to={token ? "/Admin" : "/"} onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </li>}
          <li>
            <Link to={token ? "/Dashboard" : "/"} onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={token ? "/Contact" : "/"} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <div className="bt-mobile">
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                style={{ background: "white", color: "black" }}
              >
                Logout
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  style={{ background: "white", color: "black" }}
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate("/SignUp");
                    setMenuOpen(false);
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
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
            <div>
              <button
                onClick={() => navigate("/")}
                style={{ background: "white", color: "black" }}
              >
                Log in
              </button>
              <button onClick={() => navigate("/SignUp")}>Sign up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
