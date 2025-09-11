import React from "react";
import { Routes, Route } from "react-router-dom";
import DietPlanPage from "../pages/DietPlanPage";
import LandingPage from "../pages/LandingPage";
import TrainingPlanPage from "../pages/TrainingPlanPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/DietPlan" element={<DietPlanPage />} />
      <Route path="/TrainingPlan" element={<TrainingPlanPage />} />
    </Routes>
  );
}

export default AppRoutes;
