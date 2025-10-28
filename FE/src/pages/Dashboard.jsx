import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Dashboard.css";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user?.username || "");
    }
  }, []);

  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Rise And Shine,<span className="highlight"> {username}</span>
        </h1>

        <div className="top-section">
          <div className="card red-card">
            <p className="card-title">Hello,</p>
            <p className="card-text">
              Your current weight is <span className="weight">83 kgs</span>
            </p>
          </div>

          <div className="card white-card"><a href="/DietPlan" style={{ textDecoration: 'none', color: '#1A1A1A' }}>Diet Plan</a></div>
          <div className="card white-card"><a href="/Measurements" style={{ textDecoration: 'none', color: '#1A1A1A' }}>Measurements</a></div>
          <div className="card white-card"><a href="/WorkoutPlan" style={{ textDecoration: 'none', color: '#1A1A1A' }}>Workout split</a></div>
          <div className="card white-card">Exercise index</div>
        </div>

        <div className="bottom-section">
          <div className="card white-card progress-card">
            <h3 className="card-subtitle">Progress checker</h3>
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
