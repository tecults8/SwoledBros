import React, { useState } from "react";
import "./Measurements.css";
import NavBar from "../components/NavBar";

const Measurements = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saved Measurements:", formData);
        alert("Measurements saved successfully!");
    };

    return (
        <div>
            <NavBar />
            <div className="measurements-container">
                <div className="measurements-card light-theme">
                    <h2 className="measurements-title">Enter Your Measurements</h2>
                    <form>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Chest (cm)</label>
                                <input type="number" placeholder="Enter Chest (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Waist (cm)</label>
                                <input type="number" placeholder="Enter Waist (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Hips (cm)</label>
                                <input type="number" placeholder="Enter Hips (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Thighs (cm)</label>
                                <input type="number" placeholder="Enter Thighs (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Upper Arms (cm)</label>
                                <input type="number" placeholder="Enter Upper Arms (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Neck (cm)</label>
                                <input type="number" placeholder="Enter Neck (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Height (cm)</label>
                                <input type="number" placeholder="Enter Height (cm)" />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input type="number" placeholder="Enter Weight (kg)" />
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <button type="submit" className="save-btn">Save Measurements</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Measurements;
