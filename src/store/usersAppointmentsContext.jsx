import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUsersAppointments } from "../api/appointmentsApi";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchAppointments = async () => {
      try {
        const res = await getUsersAppointments();
        // Update our state
        setAppointments(res);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchAppointments();
    // Our dependency array tells this to only run when something about the user changes
  }, [user]);

  const addAppointmentToList = (appointments) => {
    setAppointments((prev) => [...prev, appointments]);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointmentToList,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
