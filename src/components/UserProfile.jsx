import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("profile/");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); 
      }
    };

    fetchUser();
  }, [navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put("profile/", formData);
      alert("Profile updated successfully ✅");
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile ");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>


          {!editMode ? (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Last Name:</strong> {user.last_name}</p>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {["first_name", "last_name", "email"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  className="border rounded w-full p-2 mb-2"
                />
              ))}

              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}