import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

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
        // طباعة تفاصيل الخطأ من السيرفر
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
   <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> 
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        {["username", "email", "password", "first_name", "last_name"].map((f) => (
            <input
              key={f}
              type={f === "password" ? "password" : "text"}
              name={f}
              placeholder={f.replace("_", " ")}
              className="border rounded w-full p-2 mb-2"
              onChange={handleChange}
              required
            />
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-2"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}