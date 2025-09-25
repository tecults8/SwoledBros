import React, { useState } from 'react'
import './Login.css';
function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [error, setError] = useState("");
    function handleSubmit() {

    }
    return (
        <div className="login-container">
            <h1 className="title">Rise And Shine</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type= 'email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <span className="span">{error}</span>
                </div>

                <div className="signup-link">
                    <span>Already Have An Account</span>
                    <a href="/Login">Log In</a>
                </div>

                <button type="submit" className="login-btn">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp