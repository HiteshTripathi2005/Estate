import { create } from "zustand";
import instance from "../utils/axios";
import toast from "react-hot-toast";

const usePropertyStore = create((set) => ({
  loading: false,
  property: [],
  userProperties: [],
  uploading: false,
  infoLoading: false,
  info: [],

  getAllProperties: async () => {
    try {
      set({ loading: true });
      const res = await instance.get("/property/getall");
      set({ property: res.data.data });
      set({ loading: false });
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      set({ loading: false });
    }
  },

  getUserProperties: async () => {
    try {
      const res = await instance.get("/property/user-properties");
      set({ userProperties: res.data.data });
    } catch (error) {
      console.error("Error fetching user properties:", error);
      toast.error("Error fetching user properties");
    }
  },

  uploadProperty: async (formData) => {
    try {
      set({ uploading: true });
      await instance.post("/property/upload", formData);
      toast.success("Property uploaded successfully");
      set({ uploading: false });
    } catch (error) {
      console.error("Error uploading property:", error);
      set({ uploading: false });
      toast.error(error.response.data.message || "Error uploading property");
    }
  },

  deleteProperty: async (id) => {
    try {
      const res = await instance.delete(`/property/delete/${id}`);

      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error(error.response.data.message || "Error deleting property");
    }
  },

  getPropertyInfo: async (id) => {
    try {
      set({ infoLoading: true });
      const res = await instance.get(`/property/info/${id}`);
      set({ info: res.data.data });
      set({ infoLoading: false });
    } catch (error) {
      set({ infoLoading: false });
      console.error("Error getting property info:", error);
      toast.error(error.response.data.message || "Error getting property info");
    }
  },
}));

export default usePropertyStore;
