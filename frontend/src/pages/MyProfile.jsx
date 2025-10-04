import React, {useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faTicket,
  faLightbulb,
  faStar,
  faPen,
  faCreditCard,
  faMapMarkerAlt,
  faBell,
  faLock,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../api/apiClient";

const MyProfile = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activeSection, setActiveSection] = useState("profile");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Extend this to apply actual theme switching logic in app
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optionally update local state if you track login state here

    navigate("/login");
    // Optionally, dispatch 'storage' event if Navbar uses localStorage sync
    window.dispatchEvent(new Event("storage"));
  };

  const languages = [
    "English",
    "हिंदी",
    "தமிழ்",
    "తెలుగు",
    "ಕನ್ನಡ",
    "മലയാളം",
    "मराठी",
    "ગુજરાતી",
    "বাংলা",
    "ਪੰਜਾਬੀ",
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle no token: redirect or empty state
          return;
        }
        const res = await apiClient.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.user);
      } catch(err) {
        // Handle errors
        console.error("Error fetching user profile:", err, err.response?.data);
      setUserData(null); // Optionally
      }
    }
    fetchUser();
  }, []);

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Profile Header with Glassmorphism and Theme Toggle */}
      <div
  className="relative bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 mb-10
              border border-gray-200 hover:shadow-2xl transform hover:scale-[1.04] transition-all duration-400"
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  }}
>
  {/* Theme toggle box - aligned vertically with other boxes */}
    {/* <label
      htmlFor="theme-toggle"
      className="text-sm font-medium mb-2 text-gray-600"
    >
      Theme
    </label>
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className={`relative inline-flex items-center  h-5 sm:h-6  rounded-full  w-10 sm:w-12  transition-colors duration-300 focus:outline-none ${
        theme === "light" ? "bg-gray-300" : "bg-gray-600"
      }`}
      aria-pressed={theme === "dark"}
      aria-label="Toggle theme"
    >
      <span
        className={`transform transition-transform duration-300 inline-block w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full ${
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
    <p className="mt-1 text-xs text-gray-600 font-semibold">
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </p> */}
 

  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
    <div className="flex items-center gap-8">
      <div className="relative">
        <img
          src={userData.profileImage || assets.boy_pp_icon}
          alt="Profile"
          className="w-20 sm:w-24 max-w-full h-auto rounded-lg border-4 border-gradient-to-tr from-purple-400 via-indigo-500 to-blue-500 p-1 object-cover shadow-md"
        />
        <span className="absolute bottom-1 right-1  w-4 h-4 sm:w-5 sm:h-5  bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
      </div>
      <div className="text-center sm:text-left max-w-xs">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight mb-1">
          {userData.name}
        </h2>
        <p className="text-sm sm:text-md font-medium text-gray-500 truncate">
          {userData.email}
        </p>
      </div>
    </div>

    <div className="flex flex-grow justify-center gap-6 sm:gap-8 flex-wrap">
      {/* Forever InApp Money */}
      <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100 p-4 sm:p-5 rounded-2xl text-pink-800 shadow-lg flex flex-col justify-center items-center min-w-[140px] sm:min-w-[160px] space-y-3 sm:space-y-4">
        <p className="text-xs uppercase opacity-70 font-semibold tracking-wide">
          Forever InApp Money
        </p>
        <p className="text-3xl font-extrabold leading-none">
          ₹{userData.inAppMoney}
        </p>
      </div>

      {/* Rewards */}
      <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 p-4 sm:p-5 rounded-2xl text-purple-800 shadow-lg flex flex-col justify-center items-center min-w-[140px] sm:min-w-[160px] space-y-2 sm:space-y-3">
        <FontAwesomeIcon icon={faGift} className="text-2xl sm:text-3xl" />
        <p className="text-xs uppercase opacity-70 font-semibold tracking-wide">Rewards</p>
      </div>
    </div>
  </div>
</div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Access Cards */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Quick Access</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Orders", icon: faCartShopping },
                { name: "Wishlist", icon: faHeart },
                { name: "Coupons", icon: faTicket },
                { name: "Help Center", icon: faLightbulb },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 
                              hover:from-purple-50 hover:to-purple-100 transition-colors duration-300"
                >
                  <span className="text-2xl mb-2">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Account Settings</h3>
            <div className="space-y-2">
              {[
                { name: "Forever Plus", icon: faStar, path: "/foreverplus" },
                { name: "Edit Profile", icon: faPen, path: "/editprofile" },
                { name: "Saved Cards", icon: faCreditCard, path: "/savedcards" },
                { name: "Saved Addresses", icon: faMapMarkerAlt, path: "/savedaddresses" },
                { name: "Notification Settings", icon: faBell, path: "/notificationsettings" },
                { name: "Privacy Center", icon: faLock, path: "/privacycenter" },
              ].map((item) => (
                <button
                  key={item.name}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 
                              transition-colors duration-200 group"
                  onClick={() => item.path && navigate(item.path)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span className="text-gray-700 group-hover:text-purple-700">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* More Options */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">More Options</h3>
            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 
                          focus:border-purple-500 transition-shadow"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            {[
              {
                title: "My Activity",
                items: ["Reviews", "Questions & Answers"],
                gradient: "from-blue-50 to-blue-100",
              },
              {
                title: "Earn with Forever",
                items: ["Sell on Forever"],
                gradient: "from-green-50 to-green-100",
              },
              {
                title: "Feedback & Information",
                items: ["Terms & Policies", "Browse FAQs"],
                gradient: "from-yellow-50 to-yellow-100",
              },
            ].map((section) => (
              <div
                key={section.title}
                className={`p-4 rounded-xl bg-gradient-to-r ${section.gradient} mb-4`}
              >
                <h4 className="font-medium mb-3 text-gray-800">{section.title}</h4>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
           onClick={handleLogout}
          className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 
                     text-white rounded-xl hover:from-red-600 hover:to-red-700 
                     transform hover:scale-[1.02] transition-all duration-200 
                     focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
