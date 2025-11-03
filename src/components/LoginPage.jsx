import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password }); 
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setMessage("Login successful!");
      navigate("/events");
    } catch (error) {
      setMessage("Invalid credentials.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4">{message}</p>
    </div>
  );
}

export default LoginPage;
