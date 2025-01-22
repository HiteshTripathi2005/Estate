import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";

const MessageHeader = (props) => {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center border-b">
      <button
        onClick={() => props.setShowSlider(true)}
        className="md:hidden mr-4 w-8 h-8 flex items-center justify-center rounded-full border-0 hover:bg-gray-100"
      >
        <IoMdArrowRoundBack size={20} />
      </button>
      <img
        src={props.selectedUser?.friend?.profilePic}
        alt="User"
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="ml-3 flex-1">
        <h3 className="font-semibold">
          {props.selectedUser?.friend?.fullName}
        </h3>
        <p className="text-sm text-green-500">Online</p>
      </div>
    </div>
  );
};

export default MessageHeader;
