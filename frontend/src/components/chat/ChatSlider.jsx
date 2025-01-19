import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuthStore } from "./../../store/auth.store";

const ChatSlider = () => {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");

  console.log(user);

  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/044/153/184/small_2x/background-detailed-high-quality-hdr-4k-ultra-hd-free-photo.jpg",
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/050/436/766/small_2x/develop-collection-of-illustrations-inspired-by-nature-showcasing-serene-landscapes-exotic-wildlife-and-lush-vegetation-photo.jpg",
      isActive: false,
    },
  ];

  return (
    <div className="h-screen fixed left-0 top-[88px] bg-white w-full md:w-[300px] shadow-lg">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Messages</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer"
            title={user.name}
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                  user.isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">{user.name}</h3>
              <span
                className={`text-sm ${
                  user.isActive ? "text-green-500" : "text-gray-500"
                }`}
              >
                {user.isActive ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSlider;
