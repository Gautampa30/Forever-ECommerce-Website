const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);

// Add other product routes here

module.exports = router;
