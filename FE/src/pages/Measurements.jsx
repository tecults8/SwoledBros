import React, { useState, useEffect } from "react";
import "./Measurements.css";
import NavBar from "../components/NavBar";
import axios from "axios";

const Measurements = () => {
  // ✅ Get logged-in user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const token = storedUser?.token;

  const API_BASE = "https://localhost:7239/api/User"; // change to your backend URL when deployed

  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    thighs: "",
    upperArms: "",
    neck: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Configure axios instance with auth header
  const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // ✅ Fetch existing measurements
  useEffect(() => {
    const fetchMeasurements = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const res = await axiosInstance.get(`/${userId}/measurements`);
        if (res.data) {
          setFormData({
            chest: res.data.chest || "",
            waist: res.data.waist || "",
            hips: res.data.hips || "",
            thighs: res.data.thighs || "",
            upperArms: res.data.upperArms || "",
            neck: res.data.neck || "",
            height: res.data.height || "",
            weight: res.data.weight || "",
          });
        }
      } catch (err) {
        console.error("Error fetching measurements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
    // eslint-disable-next-line
  }, [userId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Save measurements to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      await axiosInstance.post(`/${userId}/measurements`, {
        chest: parseFloat(formData.chest) || null,
        waist: parseFloat(formData.waist) || null,
        hips: parseFloat(formData.hips) || null,
        thighs: parseFloat(formData.thighs) || null,
        upperArms: parseFloat(formData.upperArms) || null,
        neck: parseFloat(formData.neck) || null,
        height: parseFloat(formData.height) || null,
        weight: parseFloat(formData.weight) || null,
      });

      // ✅ Success popup + reset
      setSuccessMessage("Measurements saved successfully!");
      setFormData({
        chest: "",
        waist: "",
        hips: "",
        thighs: "",
        upperArms: "",
        neck: "",
        height: "",
        weight: "",
      });

      // Hide message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving measurements:", err);
      alert("Failed to save measurements. Check console for details.");
    }
  };

  if (loading) return <p>Loading measurements...</p>;

  return (
    <div>
      <NavBar />
      <div className="measurements-container">
        <div className="measurements-card light-theme">
          <h2 className="measurements-title">Enter Your Measurements</h2>

          {/* ✅ Green popup message */}
          {successMessage && (
            <div className="success-popup">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {[
                { name: "chest", label: "Chest (cm)" },
                { name: "waist", label: "Waist (cm)" },
                { name: "hips", label: "Hips (cm)" },
                { name: "thighs", label: "Thighs (cm)" },
                { name: "upperArms", label: "Upper Arms (cm)" },
                { name: "neck", label: "Neck (cm)" },
                { name: "height", label: "Height (cm)" },
                { name: "weight", label: "Weight (kg)" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type="number"
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="button-wrapper">
              <button type="submit" className="save-btn">
                Save Measurements
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Measurements;
