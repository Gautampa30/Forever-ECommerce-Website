const express = require("express");
const { authMiddleware } = require("../controllers/authController");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addToCart);
router.post("/remove", authMiddleware, cartController.removeFromCart);
router.post("/update", authMiddleware, cartController.updateCartItem);
router.post('/clear', authMiddleware, cartController.clearCart);


module.exports = router;
