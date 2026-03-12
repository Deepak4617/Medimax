import React, { useEffect } from "react";

import Sidebar from "../../componets/sideBar";
import getAllAppointments from "../../services/api/doctor/getAllAppoinments";
import useCustomDispatch from "../../hooks/useCustomDispatch";

import { useAuthSelector } from "../../services/selector/authSelector";

const Appointments = () => {

  const dispatch = useCustomDispatch();
  const { getAllAppointmentsResponse } = useAuthSelector();

  const appointments = Array.isArray(getAllAppointmentsResponse?.data)
    ? getAllAppointmentsResponse.data
    : [];

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          Appointments List
        </h2>

        {getAllAppointmentsResponse?.error && (
          <p className="text-center text-red-500 mb-4">
            Error: {getAllAppointmentsResponse.error.msg || "Something went wrong"}
          </p>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="min-w-full text-left">

            {/* Table Head */}
            <thead className="bg-gray-50 border-b text-sm uppercase tracking-wide text-gray-600">
              <tr>
                <th className="p-3 sm:p-4">Patient</th>
                <th className="p-3 sm:p-4">Doctor</th>
                <th className="p-3 sm:p-4">Date</th>
                <th className="p-3 sm:p-4">Time</th>
                <th className="p-3 sm:p-4">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {getAllAppointmentsResponse?.loading ? (

                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    Loading appointments...
                  </td>
                </tr>

              ) : appointments.length === 0 ? (

                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No appointments found
                  </td>
                </tr>

              ) : (

                appointments.map((a) => (

                  <tr
                    key={a._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-3 sm:p-4 font-medium">
                      {a.patient?.name || "Patient Deleted"}
                    </td>

                    <td className="p-3 sm:p-4">
                      {a.doctor?.name || "Doctor Deleted"}
                    </td>

                    <td className="p-3 sm:p-4">
                      {new Date(a.date).toLocaleDateString()}
                    </td>

                    <td className="p-3 sm:p-4">
                      {a.time || "-"}
                    </td>

                    <td className="p-3 sm:p-4">
                      <span
                        className={`px-3 py-1 rounded text-white text-xs sm:text-sm ${
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