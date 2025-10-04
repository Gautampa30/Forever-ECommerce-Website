const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authMiddleware } = require("../controllers/authController"); // Adjust path as needed


// Get orders for a user (protected route)
router.get("/user/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  // Optional: verify the user is only fetching their own orders
  if (req.user._id.toString() !== userId) {
    return res.status(403).json({ error: "Forbidden: Access denied." });
  }

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
