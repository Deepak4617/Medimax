const Appointment = require("../models/appoinments");

exports.createAppointment = async (req, res) => {
  try {

    const { doctor, date, time } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id,
  }).populate("doctor", "name specialization");

  res.json(appointments);
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Not found" });
  }

  appointment.status = status;
  await appointment.save();

  res.json(appointment);
};

exports.getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name")
    .populate("doctor", "name");

  res.json(appointments);
};

exports.getDoctorAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      doctor: req.user._id
    })
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization");

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};