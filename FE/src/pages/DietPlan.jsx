import React from "react";
import "./DietPlan.css";

const meals = [
  { title: "Breakfast", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
  { title: "Lunch", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
  { title: "Dinner", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
  { title: "Brunch Snack", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
  { title: "Evening Snack", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
  { title: "Pre Bed Snack", items: ["Bread", "Eggs", "Egg whites"], qty: [2, 2, 2] },
];

const DietPlan = () => {
  return (
    <div className="diet-container">
      {/* Header */}
      <header className="diet-header">
        <div className="brand">
          <div className="brand-logo">★</div>
          <h2>Swoledbros</h2>
        </div>
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="profile-img"
        />
      </header>

      {/* Title */}
      <h1 className="diet-title">Diet Plan</h1>

      {/* Meal Grid */}
      <div className="meal-grid">
        {meals.map((meal, index) => (
          <div key={index} className="meal-box">
            <h2 className="meal-title">{meal.title}</h2>
            <div className="meal-card">
              {meal.items.map((item, idx) => (
                <div key={idx} className="meal-item">
                  <span className="item-name">{item}</span>
                  <span className="item-qty">{meal.qty[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlan;
