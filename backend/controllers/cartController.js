const Cart = require("../models/cart");
const mongoose = require("mongoose");

exports.getCart = async (req, res) => {
    console.log("In getCart, req.user =", req.user);
  try {
     const userId = new mongoose.Types.ObjectId(req.user._id);
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }
    res.json({ cart: cart.items });  // return raw items without populate
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};


exports.addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  try {
     const userId = new mongoose.Types.ObjectId(req.user._id);
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    console.log("Cart items before add check:", cart.items);
console.log("Add request - productId:", productId, "size:", size, "quantity:", quantity);

    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );
    if (itemIndex > -1) {
      // product exists, update quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // add new product
      cart.items.push({ productId, size, quantity: quantity || 1 });
    }
    await cart.save();
    res.json({ cart: cart.items });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId, size } = req.body;
  try {
     const userId = new mongoose.Types.ObjectId(req.user._id);
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.size === size));
    await cart.save();
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId, size, quantity } = req.body;
  try {
     const userId = new mongoose.Types.ObjectId(req.user._id);
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.size === size);
    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json({ cart: cart.items });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
     const userId = new mongoose.Types.ObjectId(req.user._id);
    
    console.log("clearCart called for userId:", userId);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log("Cart document not found for user:", userId);
      return res.status(404).json({ error: "Cart not found." });
    }

    cart.items = [];
    await cart.save();
    console.log("Cart cleared successfully for user:", userId);

    res.json({ cart: [] });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart." });
  }
};



