import toast from "react-hot-toast";
import { create } from "zustand";
import instance from "../utils/axios";

const useMessageStore = create((set, get) => ({
  sliderUsers: [],
  messages: [],
  isLoading: false,

  getSliderUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await instance.get("/message/getfriends");
      set({ sliderUsers: res.data.data || [] });
    } catch (error) {
      console.error("Error in fetchUser: ", error);
      toast.error(error?.response?.data?.message || "could not fetch users");
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getMessages: async (id) => {
    try {
      if (!id) return;
      const res = await instance.get(`/message/getmessages/${id}`);
      set({ messages: res.data.data || [] });
    } catch (error) {
      console.error("Error in getMessages: ", error);
      toast.error(error?.response?.data?.message || "could not fetch messages");
    }
  },

  sendMessage: async (message, receiverId) => {
    try {
      if (!message || !receiverId) return;

      const res = await instance.post(`/message/sendmessage/${receiverId}`, {
        message,
      });

      set({
        messages: [...get().messages, res.data.data],
      });
    } catch (error) {
      console.error("Error in sendMessage: ", error);
      toast.error(error?.response?.data?.message || "could not send message");
    }
  },

  addFriends: async (id, navigate) => {
    try {
      if (!id) return;
      await instance.post(`/message/setfriend/${id}`);
      navigate("/chat");
    } catch (error) {
      console.error("Error in addFriends: ", error);
      toast.error(error?.response?.data?.message || "could not add friend");
    }
  },
}));

export default useMessageStore;
