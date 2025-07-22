import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="logo" />
        {/* Header  */}
        <h1>
          Welcome to <span className="highlight-blue">MEDI</span>
          <span className="highlight-green">TRACK</span>
        </h1>
        {/* Subtitle  */}
        <p className="subtitle">
          Your personal health companion — scan, track,
          <br />
          and stay safe with your medications.
        </p>
        {/* Email & Password */}
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              👁️
            </span>
          </div>
        </div>
        {/* Forgot password?  */}
        <a href="#" className="forgot">
          Forgot password?
        </a>
        {/* Login Button  */}
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
        {/* Sign Up  */}
        <div className="bottom-text">
          Not a member? <a href="#">Sign Up now</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
