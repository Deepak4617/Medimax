import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../componets/sideBar";

import appoinmentCreate from "../../services/api/patient/appoinmentCreate";
import getAllDoctors from "../../services/api/doctor/getAllDoctors";
import { useAuthSelector } from "../../services/selector/authSelector";

const BookAppointment = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: ""
  });

  const [message, setMessage] = useState("");

  const { getAllDoctorsResponse } = useAuthSelector();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const doctors = getAllDoctorsResponse?.data?.doctors || [];

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await dispatch(appoinmentCreate(formData)).unwrap();

      console.log(res);

      setMessage("Appointment booked successfully");

      setFormData({
        doctor: "",
        date: "",
        time: ""
      });

    } catch (error) {

      console.log(error);

      setMessage(error?.msg || "Something went wrong");

    }

  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Book Appointment
        </h2>

        <div className="bg-white shadow rounded-lg p-6 max-w-md">

          <form onSubmit={handleSubmit}>

            {/* Doctor Dropdown */}

            <label className="block mb-1 font-medium">
              Select Doctor
            </label>

            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded"
              required
            >

              <option value="">
                Choose Doctor
              </option>

              {doctors.map((doc) => (

                <option key={doc._id} value={doc._id}>
                  {doc.name} - {doc.specialization}
                </option>

              ))}

            </select>

            {/* Date */}

            <label className="block mb-1 font-medium">
              Appointment Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded"
              required
            />

            {/* Time */}

            <label className="block mb-1 font-medium">
              Appointment Time
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded"
              required
            />

            {/* Submit */}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Book Appointment
            </button>

            {/* Message */}

            {message && (
              <p className="mt-4 text-green-600">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

    </div>

  );
};

export default BookAppointment;