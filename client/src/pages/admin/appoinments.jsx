import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../../componets/sideBar";
import getAllAppointments from "../../services/api/doctor/getAllAppoinments";

import { useAuthSelector } from "../../services/selector/authSelector";

const Appointments = () => {

  const dispatch = useDispatch();
  const { getAllAppointmentsResponse } = useAuthSelector();

  const appointments = Array.isArray(getAllAppointmentsResponse?.data)
    ? getAllAppointmentsResponse.data
    : [];

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Appointments List
        </h2>

        {getAllAppointmentsResponse?.error && (
          <p className="text-center text-red-500">
            Error: {getAllAppointmentsResponse.error.msg || "Something went wrong"}
          </p>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {getAllAppointmentsResponse?.loading ? (

                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No appointments found
                  </td>
                </tr>

              ) : (

                appointments.map((a) => (

                  <tr
                    key={a._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {a.patient?.name || 'Patinet Delete'}
                    </td>

                    <td className="p-4">
                      {a.doctor?.name || 'Doctor Delete'}
                    </td>

                    <td className="p-4">
                      {new Date(a.date).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {a.time || "-"}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded text-white text-sm ${
                          a.status === "pending"
                            ? "bg-yellow-500"
                            : a.status === "approved"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {a.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default Appointments;