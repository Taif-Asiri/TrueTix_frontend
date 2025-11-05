import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/events")}>
         TrueTix
      </h1>

      <div className="flex space-x-4">
        <Link to="/events" className="hover:underline">
          Events
        </Link>
        <Link to="/tickets" className="hover:underline">
          My Tickets
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
