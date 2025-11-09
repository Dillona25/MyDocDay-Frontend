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
