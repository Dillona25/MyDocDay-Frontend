import { create } from "zustand";
import { getUserClinics } from "../api/clinicApi";
import { useAuthStore } from "./useAuth";

export const useClinicStore = create((set) => ({
  clinics: [],

  initClinics: async () => {
    const user = useAuthStore.getState().user;

    if (!user?.id) return;

    try {
      const data = await getUserClinics();
      set({ clinics: Array.isArray(data) ? data : (data.clinics ?? []) });
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
      set({ clinics: [] });
    }
  },

  addClinicToList: (clinic) => {
    set((state) => ({
      clinics: [...state.clinics, clinic],
    }));
  },
}));
