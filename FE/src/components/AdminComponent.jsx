import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Diet Plan State: each meal is an array
  const [dietPlan, setDietPlan] = useState({
    breakfast: [{ foodName: "", quantity: 0 }],
    lunch: [{ foodName: "", quantity: 0 }],
    dinner: [{ foodName: "", quantity: 0 }],
    brunchSnack: [{ foodName: "", quantity: 0 }],
    eveningSnack: [{ foodName: "", quantity: 0 }],
    preBedSnack: [{ foodName: "", quantity: 0 }],
  });

  // Workout Split State
  const [workoutSplit, setWorkoutSplit] = useState({
    day: "",
    exercises: [{ exerciseName: "", sets: 0, reps: 0 }],
  });

  // Load Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7239/api/admin/UsersWithPlans",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Diet Input Handler
  const handleDietInputChange = (meal, index, field, value) => {
    setDietPlan((prev) => {
      const updated = [...prev[meal]];
      updated[index][field] =
        field === "quantity" ? parseInt(value) || 0 : value;
      return { ...prev, [meal]: updated };
    });
  };

  const addFoodItem = (meal) => {
    setDietPlan((prev) => ({
      ...prev,
      [meal]: [...prev[meal], { foodName: "", quantity: 0 }],
    }));
  };

  const removeFoodItem = (meal, index) => {
    setDietPlan((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== index),
    }));
  };

  // Workout Input Handler
  const handleWorkoutInputChange = (index, field, value) => {
    setWorkoutSplit((prev) => {
      const updated = [...prev.exercises];
      updated[index][field] =
        field === "sets" || field === "reps" ? parseInt(value) || 0 : value;
      return { ...prev, exercises: updated };
    });
  };

  const addExercise = () => {
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseName: "", sets: 0, reps: 0 }],
    }));
  };

  // Save Diet Plan (PUT for update)
  const handleDietSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.put(
        `https://localhost:7239/api/admin/UpdateDietPlan/${selectedUser}`,
        dietPlan,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("✅ Diet Plan Updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update diet plan");
    }
  };

  // Save Workout Plan
  const handleWorkoutSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.post(
        `https://localhost:7239/api/admin/AddWorkoutSplit/${selectedUser}`,
        workoutSplit,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("✅ Workout Split Added!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add workout split");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Admin Dashboard
      </h1>

      {/* User Selection */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <label
          htmlFor="userSelect"
          style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}
        >
          Select User:
        </label>
        <select
          id="userSelect"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Select a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      {/* Diet & Workout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}
      >
        {/* Diet Plan */}
        <div
          style={{
            backgroundColor: "#fffaf0",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>🍽️ Add / Update Diet Plan</h2>

          {[
            "breakfast",
            "lunch",
            "dinner",
            "brunchSnack",
            "eveningSnack",
            "preBedSnack",
          ].map((meal) => (
            <div
              key={meal}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ textTransform: "capitalize", color: "#ff8c00" }}>
                {meal}
              </h4>

              {dietPlan[meal].map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <input
                    type="text"
                    placeholder="Food Name"
                    value={item.foodName}
                    onChange={(e) =>
                      handleDietInputChange(
                        meal,
                        idx,
                        "foodName",
                        e.target.value
                      )
                    }
                    style={{
                      flex: 2,
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleDietInputChange(
                        meal,
                        idx,
                        "quantity",
                        e.target.value
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {dietPlan[meal].length > 1 && (
                    <button
                      onClick={() => removeFoodItem(meal, idx)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => addFoodItem(meal)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  marginTop: "5px",
                }}
              >
                ➕ Add Food
              </button>
            </div>
          ))}

          <button
            onClick={handleDietSubmit}
            style={{
              backgroundColor: "#ff8c00",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Save Diet Plan
          </button>
        </div>

        {/* Workout */}
        <div
          style={{
            backgroundColor: "#f0f8ff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>🏋️ Add Workout Split</h2>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600" }}>Day:</label>
            <select
              value={workoutSplit.day}
              onChange={(e) =>
                setWorkoutSplit((prev) => ({ ...prev, day: e.target.value }))
              }
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            >
              <option value="">-- Select Day --</option>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {workoutSplit.exercises.map((ex, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h4 style={{ marginBottom: "10px", color: "#007bff" }}>
                Exercise {i + 1}
              </h4>
              <input
                type="text"
                placeholder="Exercise Name"
                value={ex.exerciseName}
                onChange={(e) =>
                  handleWorkoutInputChange(i, "exerciseName", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginBottom: "5px",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="number"
                  placeholder="Sets"
                  value={ex.sets}
                  onChange={(e) =>
                    handleWorkoutInputChange(i, "sets", e.target.value)
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={ex.reps}
                  onChange={(e) =>
                    handleWorkoutInputChange(i, "reps", e.target.value)
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addExercise}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            ➕ Add Exercise
          </button>
          <button
            onClick={handleWorkoutSubmit}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Save Workout Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
