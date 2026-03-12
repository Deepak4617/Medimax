import React, { useEffect } from "react";

import Sidebar from "../../componets/sideBar";
import Navbar from "../../componets/navBar";
import useCustomDispatch from "../../hooks/useCustomDispatch";

import getDoctorAppoinments from "../../services/api/doctor/getDoctorAppoinments";

import { useAuthSelector } from "../../services/selector/authSelector";

const DoctorDashboard = () => {

  const dispatch = useCustomDispatch();

  const { getDoctorAppoinmentsResponse } = useAuthSelector();

  const appointments = getDoctorAppoinmentsResponse?.data?.appointments || [];

  useEffect(() => {
    dispatch(getDoctorAppoinments());
  }, [dispatch]);

  return (
    <div className="md:flex h-screen bg-gray-100 overflow-hidden">
    
      <Sidebar role="doctor" />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Doctor Dashboard
          </h1>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Appointments</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {appointments.length}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Pending</h3>
              <p className="text-2xl font-bold text-yellow-500 mt-2">
                {appointments.filter(a => a.status === "pending").length}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Approved</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {appointments.filter(a => a.status === "approved").length}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">completed</h3>
              <p className="text-2xl font-bold text-blue-500 mt-2">
                {appointments.filter(a => a.status === "completed").length}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DoctorDashboard;