const User = require("../models/userModels");

exports.getDoctors = async (req, res) => {
  try {

    const doctors = await User.find({ role: "doctor" })
      .select("_id name email phone specialization");

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
    
  }
};

exports.addDoctor = async (req, res) => {
  try {

    const { name, email, phone, password, specialization } = req.body;

    if (!name || !email || !phone || !password || !specialization) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const doctorExists = await User.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists"
      });
    }

    const doctor = new User({
      name,
      email,
      phone,
      password,
      specialization,
      role: "doctor"
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

exports.deleteDoctor = async (req, res) => {

  try {

    const { id } = req.params;

    const doctor = await User.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};
