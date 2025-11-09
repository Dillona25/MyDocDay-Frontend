import { create } from "zustand";

export const useToastStore = create((set, get) => ({
  visible: false,
  title: "",
  titleClass: "",
  message: "",

  showToast: (title, message, titleClass = "") => {
    set({ visible: true, title, message, titleClass });
  },

  hideToast: () => set({ visible: false }),
}));
