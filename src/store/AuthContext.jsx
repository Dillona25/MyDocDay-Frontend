import { createContext, useState, useContext, useEffect } from "react";
import { getUsersDoctors } from "../api/doctorApi";
import { getUsersAppointments } from "../api/appointmentsApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Load our saved data on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");

    // If we have a JWT and a User, then set our token and user states
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    // Change the state of our loaded state
    setIsAuthLoaded(true);
  }, []);

  // This allows us to update the user
  // Updates is the object passed to this function containing the updates arguments
  const updateUser = (updates) => {
    setUser((prev) => {
      // Our updates user. A copy of prev is created then overwrited by any updates
      const updatedUser = { ...prev, ...updates };
      // Update our local store with JSON.stringify because local storage can only store text
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Login function accepts two parameters
  // Update states and update local storage
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
