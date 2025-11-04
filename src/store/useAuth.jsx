import { create } from "zustand";
import { getCurrentUser } from "../api/authApi";

// ---- Define the store ----
// Zustand stores are just plain functions that hold state and logic.
// You can import `useAuthStore` anywhere without wrapping your app in a provider.

export const useAuthStore = create((set, get) => ({
  // Init our states
  user: null,
  token: null,
  isAuthLoaded: false,
  error: null,

  initAuth: async () => {
    const storedToken = localStorage.getItem("jwt");

    if (!storedToken) {
      set({ isAuthLoaded: true });
      return;
    }

    set({ token: storedToken });

    try {
      const userData = await getCurrentUser();

      set({
        user: userData,
        isAuthLoaded: true,
        error: null,
      });

      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to refresh user:", error);

      // Reset both state and localStorage if token invalid
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");

      set({
        user: null,
        token: null,
        isAuthLoaded: true,
        error,
      });
    }
  },

  // Updates user data locally (used for profile edits, etc.)
  updateUser: (updates) => {
    const currentUser = get().user;
    const updatedUser = { ...currentUser, ...updates };
    set({ user: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  },

  // Handles login (sets token and user)
  login: (userData, jwtToken) => {
    set({
      user: userData,
      token: jwtToken,
      isAuthLoaded: true,
      error: null,
    });

    localStorage.setItem("jwt", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  },

  // Handles logout (clears token and user)
  logout: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    set({
      user: null,
      token: null,
      isAuthLoaded: true,
    });
  },
}));
