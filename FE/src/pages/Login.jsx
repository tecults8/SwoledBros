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

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const hashed = await hashPassword(password);

      // Step 1: Sign in
      const res = await fetch("https://localhost:7239/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: hashed,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      const token = data.token;
      const userId = data.id;

      // Step 2: Fetch user info from correct endpoint
      const userRes = await fetch(
        `https://localhost:7239/api/auth/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await userRes.json();
      if (!userRes.ok)
        throw new Error(userData.message || "Failed to fetch user details");

      // Step 3: Store in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          isAdmin: userData.isAdmin ?? false,
          weight: userData.weight ?? 0, // ✅ store user weight
          token: token,
        })
      );
      setSuccess("Login successful!");
      setUsername("");
      setPassword("");

      // ✅ Navigate to Home
      setTimeout(() => navigate("/Home"), 800);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Please Sign Up before signing in...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Rise And Shine</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
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
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="signup-link">
          <span>Don't have an account? </span>
          <a href="/SignUp">Sign Up</a>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
