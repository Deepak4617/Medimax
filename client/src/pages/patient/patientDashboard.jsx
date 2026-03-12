import React from "react";

import Sidebar from "../../componets/sideBar";
import Navbar from "../../componets/navBar";

import { FaUserMd, FaCalendarCheck, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {

  const navigate = useNavigate();

  return (

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <h1 className="text-2xl font-bold mb-6">
            Patient Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Book Appointment */}
            <div
              onClick={() => navigate("/patient/book-appointment")}
              className="bg-blue-500 cursor-pointer text-white p-6 rounded-lg shadow hover:scale-105 transition"
            >
              <div className="flex items-center gap-3">
                <FaCalendarCheck size={25} />
                <h2 className="text-lg font-semibold">
                  Book Appointment
                </h2>
              </div>

              <p className="mt-2 text-sm">
                Schedule appointment with doctors
              </p>
            </div>

            {/* Appointment History */}
            <div
              onClick={() => navigate("/patient/appointment-history")}
              className="bg-green-500 cursor-pointer text-white p-6 rounded-lg shadow hover:scale-105 transition"
            >
              <div className="flex items-center gap-3">
                <FaHistory size={25} />
                <h2 className="text-lg font-semibold">
                  Appointment History
                </h2>
              </div>

              <p className="mt-2 text-sm">
                View your previous appointments
              </p>
            </div>

            {/* Doctors List */}
            <div
              onClick={() => navigate("/patient/doctors")}
              className="bg-purple-500 cursor-pointer text-white p-6 rounded-lg shadow hover:scale-105 transition"
            >
              <div className="flex items-center gap-3">
                <FaUserMd size={25} />
                <h2 className="text-lg font-semibold">
                  Doctors List
                </h2>
              </div>

              <p className="mt-2 text-sm">
                Explore available doctors
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientDashboard;