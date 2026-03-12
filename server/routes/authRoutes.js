const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const validate = require("../middleware/validateMiddleware");
const { signUpSchema, loginSchema } = require("../validators/authValidator");

// Register
router
  .route("/register")
  .post(validate(signUpSchema), authController.register);

// Login
router
  .route("/login")
  .post(validate(loginSchema), authController.login);

// Logout
router.post("/logout", authController.logout);

module.exports = router;