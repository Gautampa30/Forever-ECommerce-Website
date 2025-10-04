import React, { useState } from "react";

const EditProfile = () => {
  // Example initial data (replace with real user data as needed)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your API here to update profile
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-purple-200 object-cover mb-2"
            />
            <input
              type="text"
              name="profileImage"
              className="mt-2 p-2 border rounded w-full"
              value={profile.profileImage}
              onChange={handleChange}
              placeholder="Profile Image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 border rounded w-full"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 border rounded w-full"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="mt-1 p-2 border rounded w-full"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
          {message && (
            <div className="mb-4 text-green-600 text-center">{message}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
