const User = require("../models/userModels");

exports.getPatients = async (req, res) => {
  try {

    const patients = await User.find({ role: "patient" })
      .select("_id name email phone");

    res.status(200).json({
      success: true,
      patients
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};


exports.deletePatient = async (req, res) => {
  try {

    const { id } = req.params;

    const patient = await User.findOneAndDelete({
      _id: id,
      role: "patient"
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};