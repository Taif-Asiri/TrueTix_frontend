import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css"; 

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("register/", form);
      localStorage.setItem("pending_username", form.username);
      alert("Check your email for the verification code!");
      navigate("/verify");
    } catch (err) {
      console.error("❌ Registration error:", err.response || err);
      if (err.response) {
        const data = err.response.data;
        if (data.email) setError("This email is already registered.");
        else if (data.username)
          setError("This username is already taken.");
        else setError(data.error || "An unknown error occurred.");
      } else {
        setError("Cannot connect to the server. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-overlay">
          <h2 className="signup-title">Create Account</h2>
          <form onSubmit={handleSignup} className="signup-form">
            {["username", "email", "password", "first_name", "last_name"].map(
              (f) => (
                <input
                  key={f}
                  type={f === "password" ? "password" : "text"}
                  name={f}
                  placeholder={f.replace("_", " ")}
                  className="signup-input"
                  onChange={handleChange}
                  required
                />
              )
            )}
            {error && <p className="signup-error">{error}</p>}
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
