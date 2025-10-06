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
const allowedOrigins = [
  "http://localhost:5173",
  "https://forever-ecommerce-website-theta.vercel.app/"
];


// Remove allowedOrigins (not needed if using wildcard)
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    // Allow ALL localhost, ALL vercel.app domains
    if (origin.includes("localhost") || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    // Block other origins
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
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
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/stripe', require('./routes/stripe'));


// Basic root route for sanity check
app.get("/", (req, res) => res.send("Server is running"));

// Start the server on PORT from environment or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
