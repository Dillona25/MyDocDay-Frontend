import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUsersDoctors } from "../api/doctorApi";

export const DoctorContext = createContext();
export const DoctorProvider = ({ children }) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchDoctors = async () => {
      try {
        const res = await getUsersDoctors();
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setDoctors(res);
      } catch (err) {
        console.log("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [user]);

  // Add new doctor to state (after successful POST)
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
