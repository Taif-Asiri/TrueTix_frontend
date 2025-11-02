import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Verify() {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post("verify/", { username, code });
      alert("Account verfied successfully");
      navigate("/login");
    } catch {
      alert("The code is invalid❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Enter the verification code
        </h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Verification code"
            className="border rounded w-full p-2 mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
