
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

// Register a new user
router.post(
  "/register",
  [
    // Validate fields
    body("fullName", "Please enter your full name").trim().notEmpty(),
    body("email", "Please enter a valid email").trim().isEmail(),
    body("password", "Password must be at least 6 characters").trim().isLength({
      min: 6,
    }),
  ],
  registerUser
);

// Log in an existing user
router.post(
  "/login",
  [
    // Validate fields
    body("email", "Please enter a valid email").trim().isEmail(),
    body("password", "Password must be at least 6 characters").trim().isLength({
      min: 6,
    }),
  ],
  loginUser
);

// Logout user
router.get("/logout", logoutUser); //  logout route



module.exports = router;
