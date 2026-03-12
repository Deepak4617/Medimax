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

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">

          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Dashboard
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-gray-600 text-sm">Doctors</h3>
              <p className="text-3xl text-blue-600 font-bold mt-2">
                {getAllDoctorsResponse?.loading ? "..." : doctorsCount}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-gray-600 text-sm">Patients</h3>
              <p className="text-3xl text-green-600 font-bold mt-2">
                {getAllPatientsResponse?.loading ? "..." : patientsCount}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-gray-600 text-sm">Appointments</h3>
              <p className="text-3xl text-purple-600 font-bold mt-2">
                {getAllAppointmentsResponse?.loading ? "..." : appointmentsCount}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-gray-600 text-sm">Revenue</h3>
              <p className="text-3xl text-green-600 font-bold mt-2">
                ₹{totalRevenue}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;