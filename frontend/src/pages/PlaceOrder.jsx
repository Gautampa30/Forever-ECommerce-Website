import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
import apiClient from "../api/apiClient";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PlaceOrder = () => {
  const { cart, products, clearCart } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const cartTotal = cart.reduce((acc, item) => {
    const product = products.find(p => p._id === item.productId);
     if (!product) return acc;
    return acc + ((product?.price || 0) * item.quantity * 100);
  }, 0);
  const totalAmount = location.state?.totalAmount || cartTotal; // fallback to cartTotal if no state passed

 
  const receiptEmail = user?.email || "";
  

  useEffect(() => {
    if (!products || products.length === 0) return; // ADD THIS GUARD
  if (!cart || cart.length === 0) return; // Optionally

    async function createPaymentIntent() {
      if (cartTotal <= 0) {
        setMessage("Cart is empty.");
        return;
      }

      try {
        const response = await apiClient.post("/create-payment-intent", {
          amount: totalAmount * 100, // convert to paise if your prices use rupees
          receiptEmail,
          userId: user._id || user.id,
          cart: cart
            .filter(item => products.find(p => p._id === item.productId)) // <-- FILTER ADDED!
            .map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: products.find(p => p._id === item.productId)?.price || 0,
          })),
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error.response || error.message);
        setMessage("Failed to initialize payment.");
      }
    }

    createPaymentIntent();
  }, [cartTotal, receiptEmail, user._id, cart, products]);

  // Check for user authentication
  if (!user?._id) {
    navigate('/login');
    return null;
  }

  const handleSuccess = (paymentIntent) => {
    console.log("Payment successful intent:", paymentIntent);
    toast.success("Payment successful!");
    setMessage("Payment successful! Redirecting to your orders...");
    clearCart();
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  const handleError = (errorMsg) => {
    setMessage(`Payment failed: ${errorMsg}`);
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Place Order</h1>
      {message && <p className="mb-4 text-center">{message}</p>}

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm
            clientSecret={clientSecret}
            amount={totalAmount * 100}    // Use totalAmount * 100 here
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </Elements>
      ) : (
        <p>Loading payment options...</p>
      )}
    </div>
  );
};

export default PlaceOrder;
