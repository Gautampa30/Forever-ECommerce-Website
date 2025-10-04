import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;

  const [cart, setCart] = useState([]);
  
const clearCart = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token being sent in clearCart:", token);
    if (!token) {
      toast.error("Please login to clear your cart.");
      return;
    }
    const response = await apiClient.post(
      "/cart/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setCart([]);
      toast.success("Cart cleared.");
    } else {
      toast.error("Failed to clear cart on server.");
    }
  } catch (error) {
    console.error("Clear cart error:", error);
    toast.error("Failed to clear cart.");
  }
};




  // Sync or fetch cart from backend on app load or user login
  const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart([]);
      return;
    }
    const response = await apiClient.get("/cart", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCart(response.data.cart || []);
  } catch (err) {
    console.error("Fetch cart error:", err);
    setCart([]);
    toast.error("Failed to fetch cart");
  }
};


  // Add item to cart (with size and quantity)
  const addToCart = async (productId, quantity, size) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add items to the cart");
        return;
      }
      console.log("Token found:", token);
      const response = await apiClient.post(
      "/cart/add",
      { productId, quantity, size },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(response.data.cart);
    toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        toast.error("Failed to add product to cart.");
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
     const response = await apiClient.post(
      "/cart/remove",
      { productId, size },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(response.data.cart);
    toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove from cart error:", err);
      toast.error("Failed to remove item from cart.");
    }
  };

  // Update item quantity
  const updateCartItemQuantity = async (productId, size, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await apiClient.post(
      "/cart/update",
      { productId, size, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(response.data.cart);
    toast.success("Cart updated");
    } catch (err) {
      console.error("Update cart item quantity error:", err);
      toast.error("Failed to update cart item quantity.");
    }
  };

  // Fetch cart on app load or when ShopContext initializes
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    fetchCart,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
