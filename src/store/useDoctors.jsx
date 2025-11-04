// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuthStore } from "./useAuth";
// import { getUsersDoctors } from "../api/doctorApi";

// export const DoctorContext = createContext();
// export const DoctorProvider = ({ children }) => {
//   const { user } = useAuthStore();
//   // A user can have multiple doctors so doctors needs to be an array
//   const [doctors, setDoctors] = useState([]);

//   // Fetch the current users doctors on page load, but ONLY if we have a user.id
//   useEffect(() => {
//     if (!user?.id) return;

//     const fetchDoctors = async () => {
//       try {
//         const res = await getUsersDoctors();

//         // Update our state
//         setDoctors(res);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };

//     fetchDoctors();
//     // Our dependency array tells this to only run when something about the user changes
//   }, [user]);

//   // Add a new doctor after a successful request
//   const addDoctorToList = (doctor) => {
//     setDoctors((prev) => [...prev, doctor]);
//   };

//   return (
//     <DoctorContext.Provider
//       value={{
//         doctors,
//         addDoctorToList,
//       }}
//     >
//       {children}
//     </DoctorContext.Provider>
//   );
// };

// export const useDoctorStore = () => useContext(DoctorContext);

import { create } from "zustand";
import { getUsersDoctors } from "../api/doctorApi";
import { useAuthStore } from "./useAuth";

export const useDoctorStore = create((set, get) => ({
  doctors: [],

  initDoctors: async () => {
    const user = useAuthStore.getState().user;

    if (!user?.id) return;

    try {
      const doctors = await getUsersDoctors();
      set({
        doctors: doctors,
      });
    } catch (error) {
      console.error("Failed to catch doctors:", error);

      set({
        doctors: [],
      });
    }
  },

  // Add new appointment to the list
  addDoctorToList: (doctor) => {
    set((state) => ({
      appointments: [...state.doctors, doctor],
    }));
  },
}));
