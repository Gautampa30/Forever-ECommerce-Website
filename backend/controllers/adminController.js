const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, stock } = req.body;

    const images = req.files.map((file) => file.path);

    const product = new Product({
      name,
      description,
      price,
      category,
      sizes: JSON.parse(sizes),
      stock,
      images,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};
