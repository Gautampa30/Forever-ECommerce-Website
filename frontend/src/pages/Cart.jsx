import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, products } from "../assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, fetchCart, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  // Load cart on component mount
  useEffect(() => {
    async function loadCart() {
      await fetchCart();
      setLoading(false);
    }
    loadCart();
  }, [fetchCart]);

  // Decrement quantity helper
  const decrementQuantity = (productId, size, quantity) => {
    if (quantity > 1) updateCartItemQuantity(productId, size, quantity - 1);
  };

  // Calculate total price using static product details
  const getCartTotal = () => {
    return cart.reduce((acc, item) => {
      const product = products.find((p) => p._id === item.productId);
      return acc + ((product?.price || 0) * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <img src={assets.cart_icon} alt="Empty Cart" className="w-20 opacity-50" />
        <p className="mt-4 text-xl text-gray-500">Your cart is empty</p>
        <button
          onClick={() => navigate("/collection")}
          className="mt-6 px-8 py-3 bg-black text-white rounded-full hover:opacity-90"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
              const totalAmount = getCartTotal() + 99 + Math.round(getCartTotal() * 0.18);


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Title text1="SHOPPING" text2="CART" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = products.find((p) => p._id === item.productId) || {};
            const imageUrl = Array.isArray(product.image)
              ? product.image[0]
              : product.image || assets.placeholder_image;
            return (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 border rounded-lg p-4">
                <img
                  src={imageUrl}
                  alt={product.name || "Product"}
                  className="w-24 h-24 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = assets.placeholder_image)}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name || "Unknown Product"}</h3>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <img src={assets.bin_icon} alt="remove" className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  <p className="font-medium">₹{product.price || 0}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(item.productId, item.size, item.quantity)}
                      className="w-8 h-8 border rounded-full"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.productId, item.size, item.quantity + 1)}
                      className="w-8 h-8 border rounded-full"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{Math.round(getCartTotal() * 0.18)}</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{getCartTotal() + 99 + Math.round(getCartTotal() * 0.18)}</span>
              </div>
            </div>

<button
  onClick={() => navigate("/place-order", { state: { totalAmount } })}
  className="w-full mt-6 bg-black text-white py-3 rounded-full hover:opacity-90"
>
  Proceed to Checkout
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
