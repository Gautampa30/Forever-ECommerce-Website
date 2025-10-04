const Product = require("../models/Product");

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add other controllers as needed, e.g. getProductById, createProduct, etc.
