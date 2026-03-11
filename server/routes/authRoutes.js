const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const validate = require("../middleware/validateMiddleware");
const { signUpSchema, loginSchema } = require("../validators/authValidator");

router
  .route('/register')
  .post(validate(signUpSchema), authController.register);

router
  .route('/login')
  .post(validate(loginSchema), authController.login);

module.exports = router;