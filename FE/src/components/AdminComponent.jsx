import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComponet.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [dietPlan, setDietPlan] = useState({
    breakfast: [{ foodName: "", quantity: "" }],
    lunch: [{ foodName: "", quantity: "" }],
    dinner: [{ foodName: "", quantity: "" }],
    brunchSnack: [{ foodName: "", quantity: "" }],
    eveningSnack: [{ foodName: "", quantity: "" }],
    preBedSnack: [{ foodName: "", quantity: "" }],
  });

  const [workoutSplit, setWorkoutSplit] = useState({
    day: "",
    exercises: [{ exerciseName: "", sets: "", reps: "" }],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://localhost:7239/api/admin/UsersWithPlans", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDietInputChange = (meal, index, field, value) => {
    setDietPlan((prev) => {
      const updated = [...prev[meal]];
      updated[index][field] = value;
      return { ...prev, [meal]: updated };
    });
  };

  const addFoodItem = (meal) => {
    setDietPlan((prev) => ({
      ...prev,
      [meal]: [...prev[meal], { foodName: "", quantity: "" }],
    }));
  };

  const removeFoodItem = (meal, index) => {
    setDietPlan((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== index),
    }));
  };

  const handleWorkoutInputChange = (index, field, value) => {
    setWorkoutSplit((prev) => {
      const updated = [...prev.exercises];
      updated[index][field] = value;
      return { ...prev, exercises: updated };
    });
  };

  const addExercise = () => {
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseName: "", sets: "", reps: "" }],
    }));
  };

  const handleDietSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.put(
        `https://localhost:7239/api/admin/UpdateDietPlan/${selectedUser}`,
        dietPlan,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("✅ Diet Plan Updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update diet plan");
    }
  };

  const handleWorkoutSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.post(
        `https://localhost:7239/api/admin/AddWorkoutSplit/${selectedUser}`,
        workoutSplit,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("✅ Workout Split Added!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add workout split");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="user-selection">
        <label htmlFor="userSelect">Select User:</label>
        <select
          id="userSelect"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">-- Select a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div className="dashboard-grid">
        {/* Diet Plan Section */}
        <div className="diet-plan">
          <h2>🍽️ Add / Update Diet Plan</h2>
          {[
            "breakfast",
            "lunch",
            "dinner",
            "brunchSnack",
            "eveningSnack",
            "preBedSnack",
          ].map((meal) => (
            <div key={meal} className="meal-section">
              <h4>{meal}</h4>
              {dietPlan[meal].map((item, idx) => (
                <div key={idx} className="input-row">
                  <input
                    type="text"
                    placeholder="Food Name"
                    value={item.foodName}
                    onChange={(e) =>
                      handleDietInputChange(meal, idx, "foodName", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleDietInputChange(meal, idx, "quantity", e.target.value)
                    }
                  />
                  {dietPlan[meal].length > 1 && (
                    <button onClick={() => removeFoodItem(meal, idx)} className="remove-btn">
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addFoodItem(meal)} className="add-btn">
                ➕ Add Food
              </button>
            </div>
          ))}
          <button onClick={handleDietSubmit} className="save-btn">
            Save Diet Plan
          </button>
        </div>

        {/* Workout Split Section */}
        <div className="workout-plan">
          <h2>🏋️ Add Workout Split</h2>
          <div className="day-select">
            <label>Day:</label>
            <select
              value={workoutSplit.day}
              onChange={(e) => setWorkoutSplit((prev) => ({ ...prev, day: e.target.value }))}
            >
              <option value="">-- Select Day --</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
          </div>

          {workoutSplit.exercises.map((ex, i) => (
            <div key={i} className="exercise-card">
              <h4>Exercise {i + 1}</h4>
              <input
                type="text"
                placeholder="Exercise Name"
                value={ex.exerciseName}
                onChange={(e) => handleWorkoutInputChange(i, "exerciseName", e.target.value)}
              />
              <div className="exercise-inputs">
                <input
                  type="number"
                  placeholder="Sets"
                  value={ex.sets || ""}
                  onChange={(e) => handleWorkoutInputChange(i, "sets", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={ex.reps || ""}
                  onChange={(e) => handleWorkoutInputChange(i, "reps", e.target.value)}
                />
              </div>
            </div>
          ))}

          <button onClick={addExercise} className="add-btn">
            ➕ Add Exercise
          </button>
          <button onClick={handleWorkoutSubmit} className="save-btn">
            Save Workout Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
