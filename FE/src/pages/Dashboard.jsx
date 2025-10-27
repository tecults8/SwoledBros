import React from "react";
import NavBar from "../components/NavBar";
import "./Dashboard.css";

function Dashboard() {
  const username = localStorage.getItem("username") || "User"; // show logged-in username

  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>
            Rise And Shine,
            <span className="highlight"> {username}</span>
          </h1>
        </div>

        {/* === Top Grid Section === */}
        <div className="dashboard-grid top-grid">
          <div className="card red-card">
            <p className="card-title">Hello,</p>
            <p className="card-text">
              Your current weight is <span className="weight">83kgs</span>
            </p>
          </div>

          <div className="link-group">
            <a href="/DietPlan" className="link-card">
              Diet Plan
            </a>
            <a href="/WorkoutPlan" className="link-card">
              Workout split
            </a>
          </div>

          <div className="link-group">
            <div className="link-card">Measurements</div>
            <div className="link-card">Exercise index</div>
          </div>
        </div>

        {/* === Bottom Grid Section === */}
        <div className="dashboard-grid bottom-grid">
          <div className="card white-card">
            <h3 className="card-subtitle">Progress checker</h3>
            <p className="card-desc">
              Check the gains and progress you made accurately and graphically
            </p>
            <div className="graph-placeholder">Graph placeholder</div>
            <button className="btn-dark">Check It Out</button>
          </div>

          <div className="card red-card step-card">
            <h3 className="card-subtitle">Step counts</h3>
            <p className="steps-number">15</p>
            <p className="steps-label">steps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
