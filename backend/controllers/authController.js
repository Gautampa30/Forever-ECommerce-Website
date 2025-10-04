const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const Cart = require("../models/cart");

// Auth middleware
exports.authMiddleware = (req, res, next) => {
      console.log("Authorization header:", req.headers.authorization);  // <=== Add here

  const authHeader = req.headers.authorization;
   console.log("Authorization header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT decoded payload:", decoded);
    console.log("Setting req.user =", { _id: decoded.user.id });
req.user = { _id: decoded.user.id };
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Profile controller
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -verificationOTP -otpExpiry");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, confirmPassword, role, address } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      address,
      verificationOTP: otp,
      otpExpiry,
      isVerified: false,
    });

    await user.save();
    // After new user.save()...
const newCart = new Cart({ user: user._id, items: [] });
await newCart.save();


    // Send OTP email
    await sendEmail(
      user.email,
      "Verify your email",
      `Your verification OTP is: ${otp}. It will expire in 10 minutes.`
    );

    res.status(201).json({ message: "User registered successfully, please verify your email with the OTP sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    if (user.verificationOTP !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.verificationOTP = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Email not verified. Please verify your email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


