import React, { createContext, useContext, useState, useCallback } from "react";
import { adminLogin, vendorLogin } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("sp_token"));
  const [role, setRole] = useState(() => localStorage.getItem("sp_role"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("sp_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = useCallback(async (selectedRole, email, password) => {
    const data =
      selectedRole === "admin"
        ? await adminLogin(email, password)
        : await vendorLogin(email, password);

    localStorage.setItem("sp_token", data.token);
    localStorage.setItem("sp_role", selectedRole);
    localStorage.setItem("sp_user", JSON.stringify(data.user));

    setToken(data.token);
    setRole(selectedRole);
    setUser(data.user);

    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("sp_token");
    localStorage.removeItem("sp_role");
    localStorage.removeItem("sp_user");
    setToken(null);
    setRole(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
