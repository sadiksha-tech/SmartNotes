// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validationMiddleware = require("../middleware/validationMiddleware");
const { body } = require("express-validator");

// -----------------------------
// User Registration
// -----------------------------
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validationMiddleware,
  UserController.register
);

// -----------------------------
// User Login
// -----------------------------
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validationMiddleware,
  UserController.login
);

module.exports = router;
