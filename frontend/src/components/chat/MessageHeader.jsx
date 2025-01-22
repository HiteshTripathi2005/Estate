import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";

const MessageHeader = (props) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white shadow-sm p-4 flex items-center border-b"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => props.setShowSlider(true)}
        className="md:hidden mr-4 w-8 h-8 flex  items-center justify-center rounded-full border-0 hover:bg-gray-100"
      >
        <IoMdArrowRoundBack size={20} />
      </motion.button>
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        src={props.selectedUser?.friend?.profilePic}
        alt="User"
        className="w-10 h-10 rounded-full object-cover border"
      />
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="ml-3 flex-1"
      >
        <h3 className="font-semibold">
          {props.selectedUser?.friend?.fullName}
        </h3>
        <p className="text-sm text-green-500">Online</p>
      </motion.div>
    </motion.div>
  );
};

export default MessageHeader;
