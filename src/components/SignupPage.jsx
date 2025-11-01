import React, { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });
      setMessage("Account created successfully! You can now log in.");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("Signup failed. Try a different username.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="mt-4">{message}</p>
    </div>
  );
}

export default SignupPage;
