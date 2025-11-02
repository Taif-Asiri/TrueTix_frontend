import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("register/", form);
      navigate("/verify", { state: { username: form.username } });
    } catch (err) {
      setError(
        err.response?.data?.email
          ? "This email is already exist"
          : "An error occurred during registration"
      );
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