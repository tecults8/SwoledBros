import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="dashboard">
      <NavBar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Rise And Shine,<span className="highlight"> {user?.username}</span>
        </h1>

        <div className="top-section">
          <div className="card red-card">
            <p className="card-title">Hello,</p>
            <p className="card-text">
              {user?.weight === 0 ? (
                <span>Please add your weight in measurement tab</span>
              ) : (
                <span>
                  Your current weight is{" "}
                  <span className="weight">{user?.weight} kgs</span>
                </span>
              )}
            </p>
          </div>

          <div className="card white-card">
            <a href="/DietPlan" style={{ textDecoration: "none", color: "#1A1A1A" }}>
              Diet Plan
            </a>
          </div>

          <div className="card white-card">
            <a href="/Measurements" style={{ textDecoration: "none", color: "#1A1A1A" }}>
              Measurements
            </a>
          </div>

          <div className="card white-card">
            <a href="/WorkoutPlan" style={{ textDecoration: "none", color: "#1A1A1A" }}>
              Workout Split
            </a>
          </div>

          <div className="card white-card">Exercise Index</div>
        </div>

        <div className="bottom-section">
          <div className="card white-card progress-card">
            <h3 className="card-subtitle">Progress Checker</h3>
            <p className="card-desc">
              Check the gains and progress you made accurately and graphically
            </p>
            <div className="graph-placeholder">
              <img
                src="https://quickchart.io/chart?c={type:'line',data:{labels:['21','24','26','28','29','30'],datasets:[{label:'Gains',data:[1,3,4,6,7,9]}]}}"
                alt="Graph"
              />
            </div>
            <button className="btn-dark">Check It Out</button>
          </div>

          <div className="card red-card step-card">
            <h3 className="card-subtitle">Step Counts</h3>
            <p className="steps-number">15</p>
            <p className="steps-label">steps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
