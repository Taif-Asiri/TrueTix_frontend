import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("user/");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); 
      }
    };

    fetchUser();
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  </>
);

}