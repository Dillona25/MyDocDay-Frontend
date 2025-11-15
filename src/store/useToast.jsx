import { create } from "zustand";

export const useToastStore = create((set, get) => {
  let timeoutId;

  const clearExistingTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    visible: false,
    title: "",
    titleClass: "",
    message: "",

    showToast: ({ title, titleClass = "", message }) => {
      clearExistingTimer();
      set({ visible: true, title, titleClass, message });

      timeoutId = setTimeout(() => {
        get().hideToast(); // reuse the existing closer
      }, 4000);
    },

    hideToast: () => {
      clearExistingTimer();
      set({ visible: false, title: "", titleClass: "", message: "" });
    },
  };
});
