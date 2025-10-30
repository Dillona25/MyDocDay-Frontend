import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUsersDoctors } from "../api/doctorApi";

export const DoctorContext = createContext();
export const DoctorProvider = ({ children }) => {
  const { user } = useAuth();
  // A user can have multiple doctors so doctors needs to be an array
  const [doctors, setDoctors] = useState([]);

  // Fetch the current users doctors on page load, but ONLY if we have a user.id
  useEffect(() => {
    if (!user?.id) return;

    const fetchDoctors = async () => {
      try {
        const res = await getUsersDoctors();

        // Update our state
        setDoctors(res);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
    // Our dependency array tells this to only run when something about the user changes
  }, [user]);

  // Add a new doctor after a successful request
  const addDoctorToList = (doctor) => {
    setDoctors((prev) => [doctor, ...prev]);
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        addDoctorToList,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => useContext(DoctorContext);
