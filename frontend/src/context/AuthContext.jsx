// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest"; // your axios instance

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from backend cookie when app starts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest.get("/users/me"); // cookie-based auth
        setCurrentUser(res.data);
      } catch (err) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  if (loading) {
    return <p>Loading...</p>; // prevents flicker before auth check finishes
  }

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};