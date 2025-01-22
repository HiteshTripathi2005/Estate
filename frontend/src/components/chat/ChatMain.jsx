import React, { useEffect, useRef } from "react";
import useMessageStore from "../../store/message.store";
import { useAuthStore } from "../../store/auth.store";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { motion } from "framer-motion";

const ChatMain = ({ setShowSlider, selectedUser }) => {
  const { user } = useAuthStore();
  const { getMessages, messages, isLoading, messageLoading } =
    useMessageStore();
  const currentUserId = user._id;
  const messagesContainerRef = useRef(null);

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`w-fit p-4 rounded-lg ${
              i % 2 === 0
                ? "ml-auto bg-gray-200 w-[60%]"
                : "mr-auto bg-gray-100 w-[70%]"
            }`}
          >
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div className="h-2 bg-gray-300 rounded w-1/4"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  useEffect(() => {
    getMessages(selectedUser?.friend?._id);
  }, [selectedUser]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <h1>Select user to dispaly message</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute top-[94px] left-[400px] max-lg:left-[350px] max-md:left-0 right-0 bottom-0 flex flex-col"
    >
      {/* Chat Header */}
      <div className="sticky top-0 z-10">
        <MessageHeader
          setShowSlider={setShowSlider}
          selectedUser={selectedUser}
          isLoading={isLoading}
        />
      </div>

      {/* Chat Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 pb-24"
      >
        {messageLoading ? (
          <LoadingSkeleton />
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <h1 className="text-2xl"> No messages yet </h1>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {messages.map((message) => (
              <motion.div
                key={`${message._id}`}
                initial={{
                  opacity: 0,
                  x: message.sender === currentUserId ? 50 : -50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className={`w-fit p-3 mb-2 break-words max-w-[80%] max-sm:max-w-[85%] shadow-sm ${
                  message.sender === currentUserId
                    ? "ml-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tl-lg rounded-bl-lg rounded-tr-sm"
                    : "mr-auto bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-tr-lg rounded-br-lg rounded-tl-sm"
                }`}
              >
                <div className="text-xl max-sm:text-base">
                  {message.message}
                </div>
                <div
                  className={`text-sm max-sm:text-xs mt-1 ${
                    message.sender === currentUserId
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-[400px] max-lg:left-[350px] max-md:left-0 right-0">
        {" "}
        <MessageInput selectedUser={selectedUser} />
      </div>
    </motion.div>
  );
};

export default ChatMain;
