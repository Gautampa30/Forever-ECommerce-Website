import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/Editprofile";
import SignupPage from "./pages/SignupPage";
import VerifyEmail from "./pages/verifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/Dashboard";



const App = () => {
  return (
    <AuthProvider>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
      <Footer/>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  </AuthProvider>  
  );
};

export default App;
