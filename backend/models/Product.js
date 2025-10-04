const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
