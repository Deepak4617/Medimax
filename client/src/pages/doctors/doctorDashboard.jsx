import React from "react";
import Sidebar from "../../componets/sideBar";
import Navbar from "../../componets/navBar";

const DoctorDashboard = () => {

  const appointments = [
    { patient: "Rahul", date: "10 March", status: "Pending" },
    { patient: "Aman", date: "11 March", status: "Confirmed" }
  ];

  return (
    <div className="flex">

      <Sidebar role="doctor" />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <h2 className="text-2xl font-bold mb-5">Appointments</h2>

          <table className="w-full bg-white shadow rounded">

            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a, i) => (
                <tr key={i} className="text-center border-b">

                  <td className="p-3">{a.patient}</td>
                  <td className="p-3">{a.date}</td>
                  <td className="p-3">{a.status}</td>

                  <td>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                      Approve
                    </button>

                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Reject
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DoctorDashboard;