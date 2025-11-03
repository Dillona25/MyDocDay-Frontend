import { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("jwt");

      if (!storedToken) {
        setIsAuthLoaded(true);
        return;
      }

      setToken(storedToken);

      try {
        const userData = await getCurrentUser();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to refresh user:", error);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
      } finally {
        setIsAuthLoaded(true);
      }
    };

    initAuth();
  }, []);

  // Allows local updates to user state
  const updateUser = (updates) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Handles login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwt", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthLoaded, login, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
