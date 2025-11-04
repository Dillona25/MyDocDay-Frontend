import { create } from "zustand";
import { getUsersAppointments } from "../api/appointmentsApi";
import { useAuthStore } from "./useAuth";

export const useAppointmentStore = create((set, get) => ({
  appointments: [],

  initAppointments: async () => {
    const user = useAuthStore.getState().user;

    if (!user?.id) return;

    try {
      const appointments = await getUsersAppointments();
      set({
        appointments: appointments,
      });
    } catch (error) {
      console.error("Failed to catch appointments:", error);

      set({
        appointments: [],
      });
    }
  },

  // Add new appointment to the list
  addAppointmentToList: (appointment) => {
    set((state) => ({
      appointments: [...state.appointments, appointment],
    }));
  },
}));
