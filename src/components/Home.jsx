import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import welcomeImage from "../assets/welcome.jpg"; 

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <img src={welcomeImage} alt="Welcome" className="home-image" />
        <div className="home-text">
          <h1 className="home-title">WELCOME to TrueTix</h1>
          <p className="home-subtitle">Buy, Sell, easilu=y and safely</p>
          <div className="home-buttons">
            <button onClick={() => navigate("/login")} className="home-btn login">Log In</button>
            <button onClick={() => navigate("/signup")} className="home-btn signup">Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}