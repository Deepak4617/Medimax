const express = require("express");
const router = express.Router();

const { getDoctors, addDoctor, deleteDoctor } = require("../controller/doctorController");

router.get("/doctors", getDoctors);
router.post("/add-doctor", addDoctor);
router.delete("/doctor/delete/:id", deleteDoctor);

module.exports = router;