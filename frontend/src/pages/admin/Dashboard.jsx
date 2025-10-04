import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p className="text-gray-600">
              Manage products, stock, and categories
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p className="text-gray-600">View and manage customer orders</p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-gray-600">Manage user accounts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
