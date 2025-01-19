import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import Navbar from "../components/common/Navbar";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Login() {
  const { fetchingUser, login } = useAuthStore();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <NavLink to={"/"} className="text-2xl">
            <FaArrowCircleLeft />
          </NavLink>
          <h1 className="text-4xl text-center font-semibold text-gray-800 mb-8">
            Welcome Back
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <button
              disabled={fetchingUser}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-200 font-semibold"
            >
              {fetchingUser ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 justify-center text-gray-600 text-2xl">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="text-blue-700 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
