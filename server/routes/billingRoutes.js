const express = require("express");
const router = express.Router();

const {
  createBill,
  getAllBills,
  payBill
} = require("../controller/billingController");

router.post("/create", createBill);

router.get("/all", getAllBills);

router.put("/pay/:id", payBill);

module.exports = router;