import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Register() {
  const { savingUser, register } = useAuthStore();
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [url, setUrl] = useState(null);

  const sendData = new FormData();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    //cretae a url
    const url = URL.createObjectURL(file);
    setUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.userName &&
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      sendData.append("userName", formData.userName);
      sendData.append("fullName", formData.fullName);
      sendData.append("email", formData.email);
      sendData.append("password", formData.password);
      sendData.append("confirmPassword", formData.confirmPassword);
    }

    if (profilePic) {
      sendData.append("profilePic", profilePic);
    }
    register(sendData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <NavLink to={"/"} className="text-2xl">
          <FaArrowCircleLeft />
        </NavLink>
        <h1 className="text-4xl text-center font-semibold text-gray-800 mb-8">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePic"
              onChange={handleImageChange}
            />
            <label
              htmlFor="profilePic"
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                src={
                  url ||
                  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                }
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-600"
              />
              <span className="text-slate-600 mt-2">
                Choose profile picture
              </span>
            </label>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="border text-2xl p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            id="userName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="FullName"
            className="border text-2xl p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            id="fullName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border text-2xl p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            id="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-3 text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
            id="confirmPassword"
            onChange={handleChange}
          />
          <button
            disabled={savingUser}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-200 font-semibold"
          >
            {savingUser ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 justify-center text-gray-600 text-2xl">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-700 hover:underline font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
