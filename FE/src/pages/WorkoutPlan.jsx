import React, { useState, useEffect, useMemo } from "react";
import "./WorkoutPlan.css";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WorkoutSplitComponent = () => {
  const [workoutSplit, setWorkoutSplit] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://your-api-url.com/api/workoutsplit"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setWorkoutSplit(data);

        // Default to today's day
        const todayIndex = new Date().getDay();
        const currentDay = DAYS_OF_WEEK[todayIndex];
        setSelectedDay(currentDay);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load workout data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const availableDays = useMemo(
    () => Object.keys(workoutSplit),
    [workoutSplit]
  );
  const currentWorkout = useMemo(
    () => workoutSplit[selectedDay] || [],
    [workoutSplit, selectedDay]
  );

  const halfLength = Math.ceil(currentWorkout.length / 2);
  const column1 = currentWorkout.slice(0, halfLength);
  const column2 = currentWorkout.slice(halfLength);

  const WorkoutItem = ({ name, setsReps }) => (
    <div className="workout-item">
      <div className="workout-name">{name}</div>
      <div className="workout-sets">{setsReps}</div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading workout schedule...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
        </div>
      );
    }

    const isRestDay =
      currentWorkout.length > 0 &&
      currentWorkout[0].name?.toLowerCase().includes("rest");

    if (isRestDay) {
      return (
        <div className="rest-day">
          <p className="rest-title">🎉 REST DAY 🎉</p>
          <p className="rest-text">Recovery is essential for muscle growth!</p>
        </div>
      );
    }

    if (currentWorkout.length === 0) {
      return (
        <div className="no-workout">
          <p>No workout defined for {selectedDay}.</p>
        </div>
      );
    }

    return (
      <div className="workout-columns">
        <div className="workout-column">
          {column1.map((item, index) => (
            <WorkoutItem key={index} {...item} />
          ))}
        </div>
        {column2.length > 0 && (
          <div className="workout-column second">
            {column2.map((item, index) => (
              <WorkoutItem key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="workout-container">
      <h1 className="title">Workout Split</h1>

      <div className="day-nav">
        {DAYS_OF_WEEK.map((day) => {
          const hasData = availableDays.includes(day);
          const isSelected = day === selectedDay;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              disabled={isLoading || !hasData}
              className={`day-btn ${isSelected ? "selected" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="workout-card">{renderContent()}</div>
    </div>
  );
};

export default function App() {
  return <WorkoutSplitComponent />;
}
