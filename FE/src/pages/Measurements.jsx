import React, { useState, useEffect } from "react";
import "./Measurements.css";
import NavBar from "../components/NavBar";
import axios from "axios";

const Measurements = () => {
  // ✅ Get user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const token = storedUser?.token;

  const API_BASE = "https://localhost:7239/api/User"; // 👉 change to your backend URL when deployed

  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    thighs: "",
    upperArms: "",
    weight: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Configure axios with token
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit updated measurements
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not found!");

    try {
      await axiosInstance.post(`/${userId}/measurements`, {
        chest: parseFloat(formData.chest) || null,
        waist: parseFloat(formData.waist) || null,
        hips: parseFloat(formData.hips) || null,
        thighs: parseFloat(formData.thighs) || null,
        upperArms: parseFloat(formData.upperArms) || null,
        weight: parseFloat(formData.weight) || null,
      });

      alert("Measurements saved successfully!");
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
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {["chest", "waist", "hips", "thighs", "upperArms", "weight"].map(
                (field) => (
                  <div key={field} className="form-group">
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {field === "weight" ? "(kg)" : "(cm)"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                )
              )}
            </div>
            <button type="submit" className="save-btn">
              Save Measurements
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Measurements;
