require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/paymentRoutes");
const paymentController = require("./controllers/paymentController");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
// Allow frontend origin to access backend API
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // if you use cookies/auth
}));
// Connect to MongoDB
connectDB();

// Stripe webhook route must come BEFORE express.json() middleware
// Correct - This MUST match the endpoint Stripe CLI is forwarding to:
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

// Middleware to parse JSON bodies
app.use(express.json());

// Mount auth routes at /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Mount your payment routes on /api
app.use("/api", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/stripe', require('./routes/stripe'));


// Basic root route for sanity check
app.get("/", (req, res) => res.send("Server is running"));

// Start the server on PORT from environment or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
