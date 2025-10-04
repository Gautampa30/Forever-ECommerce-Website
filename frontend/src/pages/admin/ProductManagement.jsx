import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: [],
    stock: "",
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      } else if (key === "sizes") {
        formDataToSend.append("sizes", JSON.stringify(formData.sizes));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post("/api/products", formDataToSend);
      toast.success("Product added successfully");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        sizes: [],
        stock: "",
        images: [],
      });
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Product Management</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            {/* Add more form fields for other product details */}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>

        {/* Product List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Current Products</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {/* Product list table */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
