import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import WorkoutPlan from "../pages/WorkoutPlan";
import ProtectedRoute from "../components/ProtectedRoute"; // import the guard
import DietPlan from "../pages/DietPlan";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />

      {/* Protected routes */}
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/WorkoutPlan"
        element={
          <ProtectedRoute>
            <WorkoutPlan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DietPlan"
        element={
          <ProtectedRoute>
            <DietPlan />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
