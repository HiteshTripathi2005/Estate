import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import useMessageStore from "../../store/message.store";
import toast from "react-hot-toast";

const MessageInput = ({ selectedUser }) => {
  const { sendMessage } = useMessageStore();
  const [message, setMessage] = useState("");

  const handelSendMessage = (e) => {
    if (!message) {
      return toast.error("Message can't be empty");
    }
    sendMessage(message, selectedUser.friend._id);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handelSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-4 shadow-md border-t"
    >
      <div className="flex items-center justify-center space-x-3 max-w-5xl mx-auto">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-6 py-[7px] sm:py-[7px] max-sm:py-[7px] max-sm:text-lg sm:text-xl md:text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 transition-all"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="size-10 bg-blue-600 border-0 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-md"
          onClick={handelSendMessage}
        >
          <IoSend size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
