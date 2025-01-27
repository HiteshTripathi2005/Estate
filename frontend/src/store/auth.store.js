import toast from "react-hot-toast";
import { create } from "zustand";
import instance from "../utils/axios";
import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create((set, get) => ({
  fetchingUser: false,
  user: null,
  isLoading: false,
  updatingUser: false,
  savingUser: false,
  socket: null,
  onlineUsers: [],
  selectedUser: null,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await instance.post("/auth/getuser");
      set({ user: response.data.data, isLoading: false });
      get().connectSocket();
    } catch (error) {
      set({ isLoading: false });
    }
  },

  register: async (formData) => {
    try {
      set({ savingUser: true });
      const res = await instance.post("/auth/register", formData);
      set({ user: res.data.data });
      set({ savingUser: false });
      get().connectSocket();
      toast.success(res?.data?.message || "Registered successfully");
    } catch (error) {
      console.error("Error in register: ", error);
      set({ savingUser: false });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  login: async (formData) => {
    try {
      set({ fetchingUser: true });
      const response = await instance.post("/auth/login", formData);
      set({ user: response.data.data });
      get().connectSocket();
      toast.success(response?.data?.message || "Logged in successfully");
    } catch (error) {
      console.error("Error in login: ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ fetchingUser: false });
    }
  },

  logout: async () => {
    try {
      await instance.post("/auth/logout");
      set({ user: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logout: ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  updateUser: async (formData) => {
    try {
      set({ updatingUser: true });
      const res = await instance.post("/auth/update", formData);
      set({ user: res.data.data });
      set({ updatingUser: false });
      toast.success(res?.data?.message || "User updated successfully");
    } catch (error) {
      console.log(error);
      set({ updatingUser: false });
      toast.error("Error updating user");
    }
  },

  connectSocket: async () => {
    try {
      const socket = io(BASE_URL, {
        query: {
          userId: get().user?._id,
        },
      });

      socket.connect();
      set({ socket: socket });

      socket.on("getOnlineUsers", (data) => {
        set({ onlineUsers: data });
      });
    } catch (error) {
      console.error("Error in connectSocket: ", error);
    }
  },

  disconnectSocket: () => {
    try {
      get().socket?.disconnect();
    } catch (error) {
      console.error("Error in disconnectSocket: ", error);
    }
  },
}));
