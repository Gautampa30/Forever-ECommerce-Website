import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const SignupPage = () => {
  // Signup form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  // OTP state
  const [otp, setOtp] = useState("");

  // Form & OTP UI state
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false); // controls OTP form visibility
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role, address } = formData;

  // Handle signup form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
    if (name in address) {
      setFormData({
        ...formData,
        address: {
          ...address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle signup form submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError("");

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await apiClient.post("/auth/register", formData);
      toast.success(response.data.message || "Signup successful! Please verify your email.");
      setSignupSuccess(true);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorsObj = {};
        err.response.data.errors.forEach(({ param, msg }) => {
          errorsObj[param] = msg;
          toast.error(msg);
        });
        setFieldErrors(errorsObj);
      } else {
        const msg = err.response?.data?.message || "Signup failed. Please try again.";
        setGeneralError(msg);
        toast.error(msg);
      }
    }
  };

  // Handle OTP verify submit
  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }

    try {
      const response = await apiClient.post("/auth/verify-email", { email, otp });
      toast.success(response.data.message || "Email verified successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid verification code.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg font-sans">
        {!signupSuccess ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Signup</h2>
            {generalError && <p className="text-red-600 mb-4 text-center">{generalError}</p>}
            <form onSubmit={handleSignupSubmit} className="flex flex-col">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                required
                className={`mb-1 p-3 border ${fieldErrors.name ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {fieldErrors.name && <p className="text-red-600 mb-2">{fieldErrors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                required
                className={`mb-1 p-3 border ${fieldErrors.email ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {fieldErrors.email && <p className="text-red-600 mb-2">{fieldErrors.email}</p>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
                className={`mb-1 p-3 border ${fieldErrors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {fieldErrors.password && <p className="text-red-600 mb-2">{fieldErrors.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                required
                className={`mb-1 p-3 border ${fieldErrors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {fieldErrors.confirmPassword && <p className="text-red-600 mb-2">{fieldErrors.confirmPassword}</p>}

              <select
                name="role"
                value={role}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={address.zip}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleChange}
                className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-pink-100 text-gray-800 py-3 rounded hover:bg-pink-200 transition-colors mb-4"
              >
                Signup
              </button>
            </form>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Verify Email</h2>
            <form onSubmit={handleVerifySubmit} className="flex flex-col">
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
            <p className="text-center text-gray-600 mt-4">
              Didn't receive the code? Check your email or{" "}
              <button
                onClick={() => setSignupSuccess(false)}
                className="text-blue-600 hover:underline"
              >
                Signup again
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
