import React from "react";
import NavBar from "../components/NavBar"; // Removed NavBar import
import { Navigate } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <NavBar />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1A1A1A",
              marginBottom: "40px",
            }}
          >
            Rise And Shine,
            <span style={{ color: "#FF3737", marginLeft: "10px" }}>Sachin</span>
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            <div
              style={{
                background: "#FF3737",
                color: "#FFFFFF",
                padding: "30px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "200px",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 10px 0",
                }}
              >
                Hello,
              </p>
              <p style={{ fontSize: "18px", margin: "0" }}>
                Your current weight is{" "}
                <span style={{ fontSize: "36px", fontWeight: "bold" }}>
                  83kgs
                </span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1A1A1A",
                  padding: "30px",
                  borderRadius: "20px",
                  minHeight: "90px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "22px",
                  fontWeight: "600",
                  boxShadow: "1px 1px #9E9E9E",
                }}
              >
                Diet Plan
              </div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1A1A1A",
                  padding: "30px",
                  borderRadius: "20px",
                  minHeight: "90px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "22px",
                  fontWeight: "600",
                  boxShadow: "1px 1px #9E9E9E",
                }}
              >
                Workout split
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1A1A1A",
                  padding: "30px",
                  borderRadius: "20px",
                  minHeight: "90px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "22px",
                  fontWeight: "600",
                  boxShadow: "1px 1px #9E9E9E",
                }}
              >
                Measurements
              </div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1A1A1A",
                  padding: "30px",
                  borderRadius: "20px",
                  minHeight: "90px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "22px",
                  fontWeight: "600",
                  boxShadow: "1px 1px #9E9E9E",
                }}
              >
                Exercise index
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                padding: "30px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                minHeight: "250px",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                }}
              >
                Progress checker
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  margin: "0 0 20px 0",
                }}
              >
                Check the gains and progress you made accurately and graphically
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#888",
                }}
              >
                Graph placeholder
              </div>
              <button
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Check It Out
              </button>
            </div>
            <div
              style={{
                background: "#FF3737",
                color: "#FFFFFF",
                padding: "30px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "250px",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                }}
              >
                Step counts
              </h3>
              <p
                style={{
                  fontSize: "72px",
                  fontWeight: "bold",
                  margin: "0",
                  lineHeight: "1",
                }}
              >
                15
              </p>
              <p style={{ fontSize: "24px", margin: "0" }}>steps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
