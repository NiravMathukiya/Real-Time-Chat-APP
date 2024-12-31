import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false, // Fixed typo
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Function to check if the user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get.connectSocket();
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

      get().connectSocket();
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
      get.disconnectSocket();
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

      get().connectSocket();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to login";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
  
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
  
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if(get().socket.connected) get().socket.disconnect();
  },
}));
