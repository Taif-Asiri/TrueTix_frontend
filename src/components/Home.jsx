import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../assets/TrueTix.png"
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-overlay">
          <img
            src= "public/images/TrueTix.png"
            alt="App Logo"
            className="home-logo"
          />
          <h1 className="home-title">Welcome to your TrueTix!</h1>
          <p className="home-text">
            Buy , sell , easialy and safely 🎉
          </p>
          <div className="home-buttons">
            <button onClick={() => navigate("/login")} className="home-btn primary">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="home-btn secondary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
