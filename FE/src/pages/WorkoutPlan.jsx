import React, { useState, useEffect, useMemo } from "react";
import "./WorkoutPlan.css";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WorkoutSplitComponent = ({ userId }) => {
  const [workoutSplit, setWorkoutSplit] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkoutData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://localhost:5001/api/Admin/Workout/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch workout data");

        const data = await response.json();
        setWorkoutSplit(data);

        const today = new Date().getDay();
        setSelectedDay(DAYS_OF_WEEK[today]);
      } catch (err) {
        setError("Failed to load workout data");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkoutData();
  }, [userId]);

  const availableDays = useMemo(
    () => Object.keys(workoutSplit),
    [workoutSplit]
  );
  const currentWorkout = useMemo(
    () => workoutSplit[selectedDay] || [],
    [workoutSplit, selectedDay]
  );

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
    if (error) return <p>{error}</p>;
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

export default function App() {
  return <WorkoutSplitComponent userId={1} />; // Pass logged-in user ID
}
