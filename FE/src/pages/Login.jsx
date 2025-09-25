import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.length < 8){
            setError('The password length should be minimum of 8 characters.');
        }
        else{
            setError("")
        }
    };

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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <span className="span">{error}</span>
                </div>

                <div className="signup-link">
                    <span>Do Not Have An Account ?</span>
                    <a href="/SignUp">Sign Up</a>
                </div>

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
