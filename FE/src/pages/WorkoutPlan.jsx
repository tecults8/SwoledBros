import React, { useState, useEffect, useMemo } from "react";
import "./WorkoutPlan.css";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WorkoutSplitComponent = () => {
  const [userId, setUserId] = useState(null);
  const [workoutSplit, setWorkoutSplit] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Step 1: Get userId & token from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("jwtToken");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setError(null);
    } else {
      setError("User not logged in. Please sign in again.");
      setIsLoading(false);
    }
  }, []);

  // ✅ Step 2: Fetch user workout data when userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchWorkout = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `https://localhost:7239/api/Admin/Workout/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }

        const data = await response.json();
        setWorkoutSplit(data);

        // Default to today’s workout if exists
        const today = new Date().getDay();
        setSelectedDay(DAYS_OF_WEEK[today]);
      } catch (err) {
        console.error(err);
        setError("Could not load workout data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [userId]);

  // ✅ Derived data
  const availableDays = useMemo(
    () => Object.keys(workoutSplit),
    [workoutSplit]
  );
  const currentWorkout = useMemo(
    () => workoutSplit[selectedDay] || [],
    [workoutSplit, selectedDay]
  );

  // ✅ Split columns
  const half = Math.ceil(currentWorkout.length / 2);
  const col1 = currentWorkout.slice(0, half);
  const col2 = currentWorkout.slice(half);

  const WorkoutItem = ({ name, setsReps }) => (
    <div className="workout-item">
      <div className="workout-name">{name}</div>
      <div className="workout-sets">{setsReps}</div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!currentWorkout.length)
      return <p>No workout defined for {selectedDay}.</p>;

    return (
      <div className="workout-columns">
        <div className="workout-column">
          {col1.map((item, i) => (
            <WorkoutItem key={i} {...item} />
          ))}
        </div>
        {col2.length > 0 && (
          <div className="workout-column">
            {col2.map((item, i) => (
              <WorkoutItem key={i} {...item} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="workout-container">
      <h1>Workout Split</h1>
      <div className="day-nav">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            className={`day-btn ${day === selectedDay ? "selected" : ""}`}
            onClick={() => setSelectedDay(day)}
            disabled={!availableDays.includes(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="workout-card">{renderContent()}</div>
    </div>
  );
};

export default WorkoutSplitComponent;
