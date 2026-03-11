const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/all",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;