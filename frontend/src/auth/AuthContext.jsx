import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  registerUser,
} from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function loadUser() {
    try {
      const res = await getCurrentUser();
      setUser(res.data?.data || null);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }

  async function login(formData) {
    const res = await loginUser(formData);
    const loggedInUser = res.data?.data?.user || res.data?.data || null;
    setUser(loggedInUser);
    return res;
  }

  async function register(formData) {
    return await registerUser(formData);
  }

  async function logout() {
    await logoutUser();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}