import React, { useEffect, useState } from "react";
import "./DietPlan.css";
import NavBar from "../components/NavBar";

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        setIsLoading(true);
        if (!userId) throw new Error("User not found in local storage");

        const response = await fetch(
          `https://localhost:7239/api/Admin/DietPlan/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch diet plan");
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        setDietPlan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDietPlan();
  }, [userId]);

  const mealOrder = [
    "breakfast",
    "lunch",
    "dinner",
    "brunchSnack",
    "eveningSnack",
    "preBedSnack",
  ];

  const formatTitle = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (c) => c.toUpperCase());

  const mealColors = {
    breakfast: "#FFD700",
    lunch: "#90EE90",
    dinner: "#87CEFA",
    brunchSnack: "#FFB6C1",
    eveningSnack: "#FFA500",
    preBedSnack: "#D3D3D3",
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="diet-container">
          <p>Loading diet plan...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="diet-container">
          <p className="error">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="diet-container">
        <h1 className="diet-title">Diet Plan</h1>

        <div className="meal-grid">
          {mealOrder.map(
            (mealKey) =>
              dietPlan[mealKey] &&
              Array.isArray(dietPlan[mealKey]) &&
              dietPlan[mealKey].length > 0 && (
                <div
                  key={mealKey}
                  className="meal-box"
                  style={{ borderTop: `5px solid ${mealColors[mealKey]}` }}
                >
                  <h2 className="meal-title">{formatTitle(mealKey)}</h2>
                  <div className="meal-card">
                    {dietPlan[mealKey].map((item, idx) => (
                      <div key={idx} className="meal-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default DietPlan;
