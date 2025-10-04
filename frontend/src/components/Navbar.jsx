import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default false

   const { cart } = useContext(ShopContext);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
  // Function to update login state from localStorage
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    setUser(userStr ? JSON.parse(userStr) : null);
  };

  checkLogin(); // Call once immediately on mount

  // Sync login state across tabs/windows
  window.addEventListener("storage", checkLogin);

  // Clean up event listener on unmount
  return () => {
    window.removeEventListener("storage", checkLogin);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const handleSearchIconClick = () => {
    if (window.innerWidth < 640) {
      setMobileSearchVisible((prev) => !prev);
      if (!mobileSearchVisible) {
        setTimeout(() => {
          if (searchInputRef.current) searchInputRef.current.focus();
        }, 100);
      }
    } else {
      if (searchInputRef.current) searchInputRef.current.focus();
    }
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Search icon */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
          onClick={handleSearchIconClick}
        />

        {/* Search input */}
        <input
          ref={searchInputRef}
          type="text"
          className={`border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
            mobileSearchVisible ? "block" : "hidden"
          } sm:block`}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "150px" }}
        />

        {/* Login / Profile section */}
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="flex items-center gap-1 text-gray-700 hover:text-black font-medium"
          >
            <img src={assets.login_icon} alt="Login" className="w-8 h-8" />
            
          </Link>
        ) : (
          <>
            <div className="group relative">
              <img
                className="w-5 cursor-pointer rounded-full"
                src={assets.profile_icon}
                alt="Profile"
              />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <Link
                    className="cursor-pointer hover:text-black"
                    to="/myprofile"
                    onClick={() => setVisible(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="cursor-pointer hover:text-black"
                    to="/orders"
                    onClick={() => setVisible(false)}
                  >
                    Orders
                  </Link>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5"
                alt="Cart"
              />
             {totalQuantity > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {totalQuantity}
            </p>
          )}
            </Link>
          </>
        )}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
