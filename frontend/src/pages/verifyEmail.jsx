import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../api/apiClient"; // Axios instance
import { toast } from "react-toastify"; // Import toast

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from SignupPage via location state
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }

    if (!email) {
      toast.error("Email address is missing. Please signup again.");
      return;
    }

    try {
      // Send both email and otp to backend for verification
      const response = await apiClient.post("/auth/verify-email", { email, otp });

      // Show backend success message as toast
      toast.success(response.data.message || "Email verified successfully");

      // On success navigate to login page
      navigate("/login");
    } catch (err) {
      // Show backend error message as toast
      toast.error(err.response?.data?.message || "Invalid verification code.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg font-sans">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Verify Email
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="otp"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-xl tracking-widest"
            pattern="\d{6}"
            title="Enter exactly 6 digits"
          />
          <button
            type="submit"
            className="bg-pink-100 text-gray-800 py-3 rounded hover:bg-pink-200 transition-colors"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
