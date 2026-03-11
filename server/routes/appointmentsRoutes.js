const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
console.log("✅ Appointment Routes Loaded");
const {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  getDoctorAppointments,
} = require("../controller/appoinmentsController");

// Patient → Create appointment
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("patient"),
  createAppointment
);

// Patient → View own appointments
router.get(
  "/my",
  authMiddleware,
  authorizeRoles("patient"),
  getMyAppointments
);

// Doctor → Update appointment status
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("doctor"),
  updateAppointmentStatus
);

// Admin → View all appointments
router.get(
  "/all",
  authMiddleware,
  authorizeRoles("admin"),
  getAllAppointments
);

// Doctor → View own patient appointments
router.get(
  "/doctor",
  authMiddleware,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

module.exports = router;