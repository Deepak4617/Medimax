const express = require("express");
const router = express.Router();

const { getPatients, deletePatient } = require("../controller/patientController");

router.get("/patients", getPatients);
router.delete("/patient/delete/:id", deletePatient);

module.exports = router;