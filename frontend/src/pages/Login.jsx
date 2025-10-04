import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient"; // Import your Axios instance
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/auth/login", { email, password });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Fetch profile using token
    const profileResponse = await apiClient.get("/auth/profile", {
      headers: { Authorization: `Bearer ${response.data.token}` },
    });
    localStorage.setItem("user", JSON.stringify(profileResponse.data.user));

    // Manually trigger storage event so Navbar updates immediately
    window.dispatchEvent(new Event("storage"));


      // Show success toast
      toast.success("Login successful!");

      // Redirect user after login (e.g., to home page)
      navigate("/");
    } catch (err) {
      // Show detailed error toast from backend response
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg font-sans">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-pink-100 text-gray-800 py-3 rounded hover:bg-pink-200 transition-colors mb-4"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
