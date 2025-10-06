import React, { useEffect, useState, useContext } from "react";
import apiClient from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";
import { products } from "../assets/assets"; // static products array

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    processing: "text-yellow-600",
    delivered: "text-green-600",
    cancelled: "text-red-600",
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching orders for user:", user._id);
        const response = await apiClient.get(
          `/orders/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Orders response:", response.data);
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <div>Loading your orders...</div>;
  if (!orders.length) return <div>No orders found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="mb-4 p-4 border rounded shadow">
          <div>
            <strong>Status: </strong>
            <span className={statusColors[order.status] || "text-gray-600"}>
              {order?.status
                ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                : "Unknown"}
            </span>
          </div>
          <div>
            <strong>Total: </strong>
            ₹{((order?.totalAmount || 0) / 100).toFixed(2)}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Unknown"}
          </div>
          <div>
            <strong>Items:</strong>
            <ul>
              {order?.items?.length ? (
                order.items.map((item) => {
                  const fullProduct = products.find(p => p._id === item.productId);
                  return (
                    <li key={item.productId}>
                      {/* Show product info */}
                      <img src={fullProduct?.image?.[0]} alt={fullProduct?.name} width={50} style={{ marginRight: 8 }} />
                      {fullProduct?.name || item.productId}
                      {" | Qty: "}{item.quantity}
                      {" | Price: ₹"}{item.price}
                      {fullProduct?.category && ` | ${fullProduct.category}`}
                    </li>
                  );
                })
              ) : (
                <li>No items found</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
