import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useMessageStore from "../../store/message.store";
import { motion, AnimatePresence } from "framer-motion";

const ChatSlider = ({ setShowSlider, setSelectedUser }) => {
  const { sliderUsers, isLoading } = useMessageStore();
  const [search, setSearch] = useState("");

  const handelClick = (user) => {
    setShowSlider(false);
    setSelectedUser(user);
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center p-4 border-b">
          <div className="w-14 h-14 rounded-full bg-gray-200"></div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      className="h-screen bg-white w-screen md:w-[350px] lg:w-[400px] shadow-xl fixed md:relative top-24 max-sm:top-20 left-0 z-40 border-r"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-5 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 transition-all"
          />
        </div>
      </motion.div>

      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence>
            {sliderUsers.map((user, index) => (
              <motion.div
                key={user.friend._id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{
                  scale: 0.98,
                  backgroundColor: "rgba(249, 250, 251, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handelClick(user)}
              >
                <div className="relative">
                  <img
                    src={user.friend.profilePic}
                    alt={user.friend.fullName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full bg-green-500" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {user.friend.fullName}
                  </h3>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default ChatSlider;
