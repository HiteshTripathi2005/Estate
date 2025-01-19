import React from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor, BsMap, BsChat, BsPerson } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { useAuthStore } from "../../store/auth.store";

const AuthNavbar = () => {
  const { logout } = useAuthStore();
  const navLinks = [
    { title: "Properties", path: "/", icon: <BsHouseDoor size={18} /> },
    { title: "Map", path: "/map", icon: <BsMap size={18} /> },
    { title: "Chat", path: "/chat", icon: <BsChat size={18} /> },
    { title: "Profile", path: "/profile", icon: <BsPerson size={18} /> },
    { title: "Logout", path: "/login", icon: <IoIosLogOut size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center items-center py-4 z-50 bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-full shadow-lg px-8 py-2 hover:scale-[1.03] transition-all">
        <div className="flex space-x-2 md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              title={link.title}
              className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium relative group rounded-full transition-all duration-300"
              onClick={() => link.title === "Logout" && logout()}
            >
              <span>{link.icon}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
