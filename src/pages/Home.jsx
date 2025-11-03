import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        Welcome to <span className="text-blue-600">TrueTix</span> 🎟️
      </h1>


      <p className="text-gray-600 mb-8 text-center max-w-md">
        Buy, sell, and manage your event tickets securely and easily.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Create Account
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition duration-200 shadow-md"
        >
          Login
        </button>
      </div>

      <p className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} TrueTix. All rights reserved.
      </p>
    </div>
  );
}
