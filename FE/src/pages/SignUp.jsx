import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return btoa(String.fromCharCode(...hashArray));
}

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !password || !email) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const hashed = await hashPassword(password);

      const res = await fetch(
        "https://swoledbros-9.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            email: email,
            password: hashed,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setSuccess("Signup successful! Redirecting to home...");

      setTimeout(() => navigate("/Home"), 1000);

      setName("");
      setEmail("");
      setPassword("");
      setPhoneNo("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="titleText">Rise And Shine</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <span className="span">{error}</span>}
        </div>

        {success && <span className="success">{success}</span>}

        <div className="signup-link">
          <span>Already Have An Account?</span>
          <a href="/">Log In</a>
        </div>

        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
