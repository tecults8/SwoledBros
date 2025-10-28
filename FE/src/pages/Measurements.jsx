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
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Chest (cm)</label>
                                <input
                                    type="text"
                                    name="chest"
                                    placeholder="Enter Chest (cm)"
                                    value={formData.chest}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Waist (cm)</label>
                                <input
                                    type="text"
                                    name="waist"
                                    placeholder="Enter Waist (cm)"
                                    value={formData.waist}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Hips (cm)</label>
                                <input
                                    type="text"
                                    name="hips"
                                    placeholder="Enter Hips (cm)"
                                    value={formData.hips}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Thighs (cm)</label>
                                <input
                                    type="text"
                                    name="thighs"
                                    placeholder="Enter Thighs (cm)"
                                    value={formData.thighs}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Upper Arms (cm)</label>
                                <input
                                    type="text"
                                    name="upperArms"
                                    placeholder="Enter Upper Arms (cm)"
                                    value={formData.upperArms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="text"
                                    name="weight"
                                    placeholder="Enter Weight (kg)"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
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
