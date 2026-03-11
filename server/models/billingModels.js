const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },

  items: [
    {
      name: String,
      price: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Billing", billingSchema);