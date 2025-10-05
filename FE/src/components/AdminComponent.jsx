import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  //  Diet Plan State
  const [dietPlan, setDietPlan] = useState({
    breakfast: { foodName: "", quantity: 0 },
    lunch: { foodName: "", quantity: 0 },
    dinner: { foodName: "", quantity: 0 },
  });

  //  Workout Split State
  const [workoutSplit, setWorkoutSplit] = useState({
    day: "",
    exercises: [{ exerciseName: "", sets: 0, reps: 0 }],
  });

  //  Load Users
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
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  //  Handle Diet Plan Input
  const handleDietInputChange = (meal, field, value) => {
    setDietPlan((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], [field]: value },
    }));
  };

  //  Handle Workout Exercise Input
  const handleWorkoutInputChange = (index, field, value) => {
    setWorkoutSplit((prev) => {
      const updated = [...prev.exercises];
      updated[index][field] = value;
      return { ...prev, exercises: updated };
    });
  };

  //  Add More Exercises
  const addExercise = () => {
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseName: "", sets: 0, reps: 0 }],
    }));
  };

  //  Save Diet Plan
  const handleDietSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.post(
        `https://localhost:7239/api/admin/AddDietPlan/${selectedUser}`,
        dietPlan,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Diet Plan Added!");
    } catch (err) {
      console.error("Error adding diet plan:", err);
      alert("❌ Failed to add diet plan");
    }
  };

  //🏋️ Save Workout Plan
  const handleWorkoutSubmit = async () => {
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.post(
        `https://localhost:7239/api/admin/AddWorkoutSplit/${selectedUser}`,
        workoutSplit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Workout Split Added!");
    } catch (err) {
      console.error("Error adding workout split:", err);
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
        🧑‍💼 Admin Dashboard
      </h1>

      {/* --- User Selection --- */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <label
          htmlFor="userSelect"
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
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
          {Array.isArray(users) &&
            users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
        </select>
      </div>

      {/* --- Side by Side Layout --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}
      >
        {/* Diet Plan Section */}
        <div
          style={{
            backgroundColor: "#fffaf0",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(255, 165, 0, 0.2)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>🍽️ Add Diet Plan</h2>

          {["breakfast", "lunch", "dinner"].map((meal) => (
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
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontWeight: "600" }}>Food Name:</label>
                <input
                  type="text"
                  placeholder="eg: eggs, chicken"
                  value={dietPlan[meal].foodName}
                  onChange={(e) =>
                    handleDietInputChange(meal, "foodName", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontWeight: "600" }}>Quantity:</label>
                <input
                  type="number"
                  value={dietPlan[meal].quantity}
                  onChange={(e) =>
                    handleDietInputChange(
                      meal,
                      "quantity",
                      parseInt(e.target.value) || 0
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleDietSubmit}
            style={{
              backgroundColor: "#ff8c00",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Save Diet Plan
          </button>
        </div>

        {/* Workout Split Section */}
        <div
          style={{
            backgroundColor: "#f0f8ff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 123, 255, 0.2)",
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

              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontWeight: "600" }}>Exercise Name:</label>
                <input
                  type="text"
                  placeholder="e.g., Bench Press"
                  value={ex.exerciseName}
                  onChange={(e) =>
                    handleWorkoutInputChange(i, "exerciseName", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>Sets:</label>
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) =>
                      handleWorkoutInputChange(
                        i,
                        "sets",
                        parseInt(e.target.value) || 0
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>Reps:</label>
                  <input
                    type="number"
                    value={ex.reps}
                    onChange={(e) =>
                      handleWorkoutInputChange(
                        i,
                        "reps",
                        parseInt(e.target.value) || 0
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      marginTop: "5px",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addExercise}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
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
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
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
