import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("tickets/"); 
      setUser(true);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
