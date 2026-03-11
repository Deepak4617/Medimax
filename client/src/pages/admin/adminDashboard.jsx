import React from "react";
import Sidebar from "../../componets/sideBar";
import Navbar from "../../componets/navBar";

import { useAuthSelector } from "../../services/selector/authSelector";

const AdminDashboard = () => {

  const {
    getAllDoctorsResponse,
    getAllPatientsResponse,
    getAllAppointmentsResponse,
    getAllBillsResponse
  } = useAuthSelector();

  const doctorsCount = getAllDoctorsResponse?.data?.doctors?.length || 0;
  const patientsCount = getAllPatientsResponse?.data?.patients?.length || 0;
  const appointmentsCount = getAllAppointmentsResponse?.data?.length || 0;

  const billsData = getAllBillsResponse?.data?.bills || [];

  const totalRevenue = billsData.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0
  );

  return (
    <div className="flex">

      <Sidebar role="admin" />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6 grid grid-cols-4 gap-6">

          {/* Doctors */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold">Doctors</h3>
            <p className="text-3xl text-blue-600 font-bold">
              {getAllDoctorsResponse?.loading ? "..." : doctorsCount}
            </p>
          </div>

          {/* Patients */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold">Patients</h3>
            <p className="text-3xl text-green-600 font-bold">
              {getAllPatientsResponse?.loading ? "..." : patientsCount}
            </p>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold">Appointments</h3>
            <p className="text-3xl text-purple-600 font-bold">
              {getAllAppointmentsResponse?.loading ? "..." : appointmentsCount}
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold">Revenue</h3>
            <p className="text-3xl text-green-600 font-bold">{totalRevenue}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;