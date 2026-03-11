const Billing = require("../models/billingModels");

exports.createBill = async (req, res) => {

  try {

    const { patientId, doctorId, appointmentId, items } = req.body;

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const bill = await Billing.create({
      patientId,
      doctorId,
      appointmentId,
      items,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: "Bill created successfully",
      bill
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getAllBills = async (req, res) => {

  try {

    const bills = await Billing.find()
      .populate("patientId", "name")
      .populate("doctorId", "name");

    res.status(200).json({
      success: true,
      bills
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.payBill = async (req, res) => {

  try {

    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "Paid" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment successful",
      bill
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};