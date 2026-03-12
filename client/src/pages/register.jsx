import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useAuthSelector } from "../services/selector/authSelector";

import authRegister from "../services/api/auth/authRegister";
import useCustomDispatch from "../hooks/useCustomDispatch";
import Loader from "../common/loader";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useCustomDispatch();

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    specialization: ""
  };

  const [userData, setUserData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { authRegisterResponse } = useAuthSelector();

  const handleUserData = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    });
  };

  const validateRegister = () => {

    if (!userData.name)
      return "Please Enter Your Name";

    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email))
      return "Please Enter a Valid Email";

    if (!userData.phone || userData.phone.length < 10)
      return "Please Enter a Valid Phone Number";

    if (!userData.password || userData.password.length < 6)
      return "Password must be at least 6 characters";

    if (!userData.role)
      return "Please select your role";

    if (userData.role === "doctor" && !userData.specialization)
      return "Please enter doctor specialization";

    return null;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationError = validateRegister();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {

      setErrorMessage(null);
      setSuccessMessage(null);

      const res = await dispatch(authRegister(userData)).unwrap();

      console.log("REGISTER RESPONSE:", res);

      setSuccessMessage(res?.message || "Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {

      console.error("Register failed", error);

      setErrorMessage(
        error?.extraDetails ||
        error?.msg ||
        error?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600">

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded"
            name="name"
            onChange={handleUserData}
            value={userData.name}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            name="email"
            onChange={handleUserData}
            value={userData.email}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            name="password"
            onChange={handleUserData}
            value={userData.password}
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full p-3 border rounded"
            name="phone"
            onChange={handleUserData}
            value={userData.phone}
          />

          {/* ROLE */}

          <select
            name="role"
            value={userData.role}
            onChange={handleUserData}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {/* SPECIALIZATION */}

          {userData.role === "doctor" && (
            <input
              type="text"
              placeholder="Doctor Specialization"
              className="w-full p-3 border rounded"
              name="specialization"
              onChange={handleUserData}
              value={userData.specialization}
            />
          )}

          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-500">{successMessage}</p>
          )}

          <button className="w-full bg-blue-900 text-white p-3 rounded hover:bg-blue-700 transition">
              {authRegisterResponse?.loading ? <Loader/> : "Register"}
            
          </button>

        </form>

        <p className="mt-4 text-center text-gray-600">

          Already have account?

          <Link
            to="/login"
            className="text-blue-900 font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;