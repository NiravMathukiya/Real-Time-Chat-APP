import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false, // Fixed typo
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // Function to check if the user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      // console.error(
      //   "Error during auth check:",
      //   error.toJSON ? error.toJSON() : error
      // );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Function to sign up a new user
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to sign up";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to logout up";
      toast.error(errorMessage);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to login";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  
}));
