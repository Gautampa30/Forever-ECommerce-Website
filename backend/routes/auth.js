const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const { getProfile, authMiddleware } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)
      .withMessage(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
      ),
    check("confirmPassword", "Confirm password field must have the same value as the password field")
      .custom((value, { req }) => value === req.body.password),
  ],
  authController.registerUser
);

router.post("/verify-email", authController.verifyEmail);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.loginUser
);


router.get("/profile", authMiddleware, getProfile);


module.exports = router;
