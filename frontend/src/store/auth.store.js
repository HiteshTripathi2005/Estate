import toast from "react-hot-toast";
import { create } from "zustand";
import instance from "../utils/axios";

export const useAuthStore = create((set) => ({
  fetchingUser: false,
  user: null,
  isLoading: true,
  updatingUser: false,
  savingUser: false,

  fetchUser: async () => {
    try {
      const response = await instance.post("/auth/getuser");
      set({ user: response.data.data, isLoading: false });
    } catch (error) {
      console.error("Error in fetchUser: ", error);
      set({ isLoading: false });
    }
  },

  register: async (formData) => {
    try {
      set({ savingUser: true });
      const res = await instance.post("/auth/register", formData);
      set({ user: res.data.data });
      set({ savingUser: false });
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
}));
