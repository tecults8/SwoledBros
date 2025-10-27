// AdminDashboardCompactInline.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Admin Dashboard - Inline styles only
 * - Hybrid layout: maxWidth on desktop, full-width on small screens
 * - Style: S2 (Bordered Sections), Spacious (Z)
 * - Buttons: Centered (B2)
 *
 * Usage:
 *   import AdminDashboardCompactInline from './AdminDashboardCompactInline';
 *   <AdminDashboardCompactInline />
 */

function SmallToast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const bg =
    type === "success" ? "#16a34a" : type === "error" ? "#dc3545" : "#0b74de";

  const toastStyle = {
    position: "fixed",
    right: 18,
    bottom: 18,
    padding: "12px 16px",
    borderRadius: 10,
    color: "#fff",
    background: bg,
    boxShadow: "0 8px 24px rgba(11,20,30,0.12)",
    cursor: "pointer",
    zIndex: 9999,
    fontWeight: 600,
  };

  return (
    <div role="status" aria-live="polite" style={toastStyle} onClick={onClose}>
      {message}
    </div>
  );
}

export default function AdminDashboardCompactInline() {
  // -------------------------
  // Styles (reusable objects)
  // -------------------------
  const styles = {
    root: {
      width: "100%",
      maxWidth: 900, // hybrid: fixed on desktop, full-width on small screens
      margin: "20px auto",
      padding: 20,
      boxSizing: "border-box",
      fontFamily:
        "Inter, Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#0b1220",
    },
    headerRow: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 18,
    },
    title: {
      fontSize: 22,
      margin: 0,
      fontWeight: 700,
    },
    userRow: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      flexWrap: "wrap",
    },
    label: { fontSize: 14, color: "#374151", fontWeight: 600 },
    select: {
      minWidth: 220,
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e6e6e6",
      background: "#fff",
    },

    tabsRow: { display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" },
    tabBtn: (active) => ({
      padding: "8px 14px",
      borderRadius: 8,
      cursor: "pointer",
      background: active ? "#0b74de" : "#f3f4f6",
      color: active ? "#fff" : "#111827",
      fontWeight: active ? 700 : 600,
      border: "1px solid",
      borderColor: active ? "#0b74de" : "#e6e6e6",
    }),

    section: {
      border: "1px solid #e6e6e6",
      borderRadius: 8,
      padding: 18,
      background: "#fff",
      marginBottom: 16,
    },

    // Spacious form layout:
    formRow: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 14,
      flexWrap: "wrap",
    },
    formCol: { flex: 1, minWidth: 160 },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 8,
      border: "1px solid #e6e6e6",
      fontSize: 14,
      boxSizing: "border-box",
      background: "#fff",
    },
    smallInput: { width: "100%", padding: "10px 12px", borderRadius: 8 },
    tableLike: { display: "flex", flexDirection: "column", gap: 12 },

    rowLike: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap",
    },
    foodInput: { flex: 1, minWidth: 140 },
    qtyInput: { width: 110, minWidth: 110 },

    actionRowCentered: {
      display: "flex",
      justifyContent: "center",
      marginTop: 12,
    },

    buttonPrimary: {
      padding: "10px 18px",
      borderRadius: 8,
      background: "#0b74de",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
    },
    buttonGhost: {
      padding: "10px 14px",
      borderRadius: 8,
      background: "#fff",
      color: "#111827",
      border: "1px solid #e6e6e6",
      cursor: "pointer",
    },
    smallIconBtn: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #e6e6e6",
      background: "#fff",
      cursor: "pointer",
    },

    muted: { color: "#6b7280", fontSize: 13 },
    fieldError: {
      color: "#dc3545",
      marginTop: 8,
      fontWeight: 600,
      fontSize: 13,
    },
  };

  // -------------------------
  // State
  // -------------------------
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [activeTab, setActiveTab] = useState("membership");

  // Diet
  const initialDietPlan = {
    breakfast: [{ foodName: "", quantity: 0 }],
    lunch: [{ foodName: "", quantity: 0 }],
    dinner: [{ foodName: "", quantity: 0 }],
    brunchSnack: [{ foodName: "", quantity: 0 }],
    eveningSnack: [{ foodName: "", quantity: 0 }],
    preBedSnack: [{ foodName: "", quantity: 0 }],
  };
  const [dietPlan, setDietPlan] = useState(initialDietPlan);
  const [activeMeal, setActiveMeal] = useState("breakfast");

  // Workout
  const initialWorkoutSplit = {
    day: "",
    exercises: [{ exerciseName: "", sets: 0, reps: 0 }],
  };
  const [workoutSplit, setWorkoutSplit] = useState(initialWorkoutSplit);

  // Membership
  const initialMembership = { startDate: "", endDate: "" };
  const [membership, setMembership] = useState(initialMembership);
  const [loadingMembership, setLoadingMembership] = useState(false);
  const [membershipError, setMembershipError] = useState("");

  // Toast
  const [toast, setToast] = useState({ message: "", type: "info" });
  const showToast = (message, type = "info") => setToast({ message, type });

  // -------------------------
  // Effects - load users & membership
  // -------------------------
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
        console.error("Failed to load users", err);
        showToast("Failed to load users", "error");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setMembership(initialMembership);
      setMembershipError("");
      return;
    }

    const fetchMembership = async () => {
      setLoadingMembership(true);
      setMembershipError("");
      try {
        const res = await axios.get(
          `https://localhost:7239/api/admin/Membership/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const user = res.data || {};
        const start = user?.membershipStartDate
          ? user.membershipStartDate.split("T")[0]
          : "";
        const end = user?.membershipEndDate
          ? user.membershipEndDate.split("T")[0]
          : "";
        setMembership({ startDate: start, endDate: end });
      } catch (err) {
        console.warn("Failed to fetch membership", err);
        showToast("Failed to load membership", "error");
        setMembership(initialMembership);
      } finally {
        setLoadingMembership(false);
      }
    };

    fetchMembership();
  }, [selectedUser]);

  // -------------------------
  // Diet handlers
  // -------------------------
  const handleDietInputChange = (meal, idx, field, value) => {
    setDietPlan((prev) => {
      const updated = prev[meal].map((it, i) =>
        i === idx
          ? {
              ...it,
              [field]: field === "quantity" ? parseInt(value) || 0 : value,
            }
          : it
      );
      return { ...prev, [meal]: updated };
    });
  };

  const addFoodItem = (meal) =>
    setDietPlan((prev) => ({
      ...prev,
      [meal]: [...prev[meal], { foodName: "", quantity: 0 }],
    }));

  const removeFoodItem = (meal, idx) =>
    setDietPlan((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== idx),
    }));

  // -------------------------
  // Workout handlers
  // -------------------------
  const handleWorkoutInputChange = (idx, field, value) => {
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === idx
          ? {
              ...ex,
              [field]:
                field === "sets" || field === "reps"
                  ? parseInt(value) || 0
                  : value,
            }
          : ex
      ),
    }));
  };

  const addExercise = () =>
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseName: "", sets: 0, reps: 0 }],
    }));

  const removeExercise = (idx) =>
    setWorkoutSplit((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== idx),
    }));

  // -------------------------
  // Validation
  // -------------------------
  const validateMembership = ({ startDate, endDate }) => {
    if (!startDate && !endDate) return { valid: true, message: "" };
    if (!startDate || !endDate)
      return {
        valid: false,
        message: "Both start and end dates are required.",
      };
    if (endDate < startDate)
      return { valid: false, message: "End date must be after start date." };
    return { valid: true, message: "" };
  };

  // -------------------------
  // Submits
  // -------------------------
  const handleDietSubmit = async () => {
    if (!selectedUser) {
      showToast("Select a user first", "error");
      return;
    }
    try {
      await axios.put(
        `https://localhost:7239/api/admin/UpdateDietPlan/${selectedUser}`,
        dietPlan,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      showToast("Diet plan updated", "success");
      setDietPlan(initialDietPlan);
    } catch (err) {
      console.error(err);
      showToast("Failed to update diet plan", "error");
    }
  };

  const handleWorkoutSubmit = async () => {
    if (!selectedUser) {
      showToast("Select a user first", "error");
      return;
    }
    try {
      await axios.post(
        `https://localhost:7239/api/admin/AddWorkoutSplit/${selectedUser}`,
        workoutSplit,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      showToast("Workout split added", "success");
      setWorkoutSplit(initialWorkoutSplit);
    } catch (err) {
      console.error(err);
      showToast("Failed to add workout split", "error");
    }
  };

  const handleMembershipSubmit = async () => {
    if (!selectedUser) {
      showToast("Select a user first", "error");
      return;
    }
    const { valid, message } = validateMembership(membership);
    if (!valid) {
      setMembershipError(message);
      return;
    }
    try {
      await axios.put(
        `https://localhost:7239/api/admin/UpdateMembership/${selectedUser}`,
        {
          membershipStartDate: membership.startDate || null,
          membershipEndDate: membership.endDate || null,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      showToast("Membership updated", "success");
      setMembership(initialMembership);
      setMembershipError("");
    } catch (err) {
      console.error("Failed to update membership", err);
      showToast("Failed to update membership", "error");
    }
  };

  // Display name map for meals
  const mealDisplayName = (m) =>
    ({
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      brunchSnack: "Brunch / Snack",
      eveningSnack: "Evening Snack",
      preBedSnack: "Pre-Bed Snack",
    }[m] || m);

  // -------------------------
  // JSX
  // -------------------------
  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Admin Dashboard</h1>

        <div style={styles.userRow}>
          <div>
            <div style={styles.label}>Select User</div>
            <select
              style={styles.select}
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
              }}
            >
              <option value="">-- Select User --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={styles.muted}>Selected: </div>
            <div style={{ fontWeight: 700 }}>
              {users.find((x) => String(x.id) === String(selectedUser))
                ?.username || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabsRow}>
        <div
          style={styles.tabBtn(activeTab === "membership")}
          onClick={() => setActiveTab("membership")}
        >
          📅 Membership
        </div>
        <div
          style={styles.tabBtn(activeTab === "diet")}
          onClick={() => setActiveTab("diet")}
        >
          🍽 Diet Plan
        </div>
        <div
          style={styles.tabBtn(activeTab === "workout")}
          onClick={() => setActiveTab("workout")}
        >
          🏋️ Workout Split
        </div>
      </div>

      {/* Tab content */}
      <div style={styles.section}>
        {activeTab === "membership" && (
          <div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={styles.formCol}>
                <div style={styles.label}>Start Date</div>
                <input
                  type="date"
                  style={styles.input}
                  value={membership.startDate}
                  onChange={(e) =>
                    setMembership((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formCol}>
                <div style={styles.label}>End Date</div>
                <input
                  type="date"
                  style={styles.input}
                  value={membership.endDate}
                  onChange={(e) =>
                    setMembership((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>

            {membershipError && (
              <div style={styles.fieldError}>{membershipError}</div>
            )}
            {loadingMembership && (
              <div style={{ marginTop: 8, ...styles.muted }}>
                Loading membership…
              </div>
            )}

            <div style={styles.actionRowCentered}>
              <button
                style={styles.buttonPrimary}
                onClick={handleMembershipSubmit}
                disabled={loadingMembership}
              >
                Save Membership
              </button>
            </div>
          </div>
        )}

        {activeTab === "diet" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 14,
                flexWrap: "wrap",
              }}
            >
              <div style={{ minWidth: 180 }}>
                <div style={styles.label}>Meal</div>
                <select
                  style={styles.input}
                  value={activeMeal}
                  onChange={(e) => setActiveMeal(e.target.value)}
                >
                  {Object.keys(dietPlan).map((m) => (
                    <option key={m} value={m}>
                      {mealDisplayName(m)}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button
                  style={styles.buttonGhost}
                  onClick={() => {
                    // quick reset visible meal
                    setDietPlan((p) => ({
                      ...p,
                      [activeMeal]: [{ foodName: "", quantity: 0 }],
                    }));
                    showToast(
                      `${mealDisplayName(activeMeal)} cleared locally`,
                      "info"
                    );
                  }}
                >
                  Clear Meal
                </button>
              </div>
            </div>

            <div style={styles.tableLike}>
              {/* header row */}
              <div
                style={{ ...styles.rowLike, color: "#6b7280", fontWeight: 700 }}
              >
                <div style={{ flex: 1 }}>Food</div>
                <div style={{ width: 110 }}>Quantity</div>
                <div style={{ width: 80 }} />
              </div>

              {/* items */}
              {dietPlan[activeMeal].map((item, idx) => (
                <div key={idx} style={styles.rowLike}>
                  <input
                    placeholder="e.g. Eggs"
                    value={item.foodName}
                    onChange={(e) =>
                      handleDietInputChange(
                        activeMeal,
                        idx,
                        "foodName",
                        e.target.value
                      )
                    }
                    style={{ ...styles.input, ...styles.foodInput }}
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleDietInputChange(
                        activeMeal,
                        idx,
                        "quantity",
                        e.target.value
                      )
                    }
                    style={{ ...styles.input, ...styles.qtyInput }}
                  />
                  <div
                    style={{
                      width: 80,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      aria-label="remove"
                      title="Remove"
                      style={styles.smallIconBtn}
                      onClick={() => removeFoodItem(activeMeal, idx)}
                      disabled={dietPlan[activeMeal].length === 1}
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <button
                  style={styles.buttonGhost}
                  onClick={() => addFoodItem(activeMeal)}
                >
                  + Add Row
                </button>
                <div style={styles.muted}>
                  Add foods for {mealDisplayName(activeMeal)}
                </div>
              </div>

              <div style={styles.actionRowCentered}>
                <button style={styles.buttonPrimary} onClick={handleDietSubmit}>
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workout" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <div style={{ minWidth: 180 }}>
                <div style={styles.label}>Day</div>
                <select
                  style={styles.input}
                  value={workoutSplit.day}
                  onChange={(e) =>
                    setWorkoutSplit((p) => ({ ...p, day: e.target.value }))
                  }
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
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button style={styles.buttonGhost} onClick={addExercise}>
                  + Exercise
                </button>
              </div>
            </div>

            <div style={styles.tableLike}>
              {/* header */}
              <div
                style={{ ...styles.rowLike, color: "#6b7280", fontWeight: 700 }}
              >
                <div style={{ flex: 1 }}>Exercise</div>
                <div style={{ width: 110 }}>Sets</div>
                <div style={{ width: 110 }}>Reps</div>
                <div style={{ width: 80 }} />
              </div>

              {workoutSplit.exercises.map((ex, idx) => (
                <div key={idx} style={styles.rowLike}>
                  <input
                    placeholder="e.g. Bench Press"
                    value={ex.exerciseName}
                    onChange={(e) =>
                      handleWorkoutInputChange(
                        idx,
                        "exerciseName",
                        e.target.value
                      )
                    }
                    style={{ ...styles.input, flex: 1 }}
                  />
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) =>
                      handleWorkoutInputChange(idx, "sets", e.target.value)
                    }
                    style={{ ...styles.input, width: 110 }}
                  />
                  <input
                    type="number"
                    value={ex.reps}
                    onChange={(e) =>
                      handleWorkoutInputChange(idx, "reps", e.target.value)
                    }
                    style={{ ...styles.input, width: 110 }}
                  />
                  <div
                    style={{
                      width: 80,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      style={styles.smallIconBtn}
                      onClick={() => removeExercise(idx)}
                      aria-label="remove-ex"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}

              <div style={styles.actionRowCentered}>
                <button
                  style={styles.buttonPrimary}
                  onClick={handleWorkoutSubmit}
                >
                  Save Workout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <SmallToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "" })}
      />
    </div>
  );
}
