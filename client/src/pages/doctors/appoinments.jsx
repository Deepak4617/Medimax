import React, { useEffect } from "react";

import Sidebar from "../../componets/sideBar";

import getDoctorAppoinments from "../../services/api/doctor/getDoctorAppoinments";
import updateAppointmentStatus from "../../services/api/doctor/updateAppoinmentsStatus";

import useCustomDispatch from "../../hooks/useCustomDispatch";
import { useAuthSelector } from "../../services/selector/authSelector";

const Appointments = () => {

  const dispatch = useCustomDispatch();

  const { getDoctorAppoinmentsResponse } = useAuthSelector();

  const appointments =
    getDoctorAppoinmentsResponse?.data?.appointments || [];

  useEffect(() => {
    dispatch(getDoctorAppoinments());
  }, [dispatch]);

  const handleStatusUpdate = async (id, status) => {

    try {

      await dispatch(updateAppointmentStatus({ id, status })).unwrap();

      dispatch(getDoctorAppoinments());

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          My Appointments
        </h2>

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-2 md:p-4">Patient</th>
                <th className="p-2 md:p-4">Doctor</th>
                <th className="p-2 md:p-4">Date</th>
                <th className="p-2 md:p-4">Time</th>
                <th className="p-2 md:p-4">Status</th>
                <th className="p-2 md:p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {/* Loader */}

              {getDoctorAppoinmentsResponse?.loading && (
                <tr>
                  <td colSpan="6" className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              )}

              {/* Empty State */}

              {!getDoctorAppoinmentsResponse?.loading &&
                appointments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-6 text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}

              {/* Data */}

              {appointments.map((a) => (

                <tr
                  key={a._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-2 md:p-4 font-medium">
                    {a.patient?.name || "Patient Deleted"}
                  </td>

                  <td className="p-2 md:p-4">
                    {a.doctor?.name || "Doctor Deleted"}
                  </td>

                  <td className="p-2 md:p-4">
                    {new Date(a.date).toLocaleDateString()}
                  </td>

                  <td className="p-2 md:p-4">
                    {a.time}
                  </td>

                  {/* Status */}

                  <td className="p-2 md:p-4">

                    <span
                      className={`px-3 py-1 rounded text-white text-xs md:text-sm ${
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

                  {/* Actions */}

                  <td className="p-2 md:p-4 flex flex-wrap gap-2">

                    <button
                      onClick={() => handleStatusUpdate(a._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(a._id, "pending")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(a._id, "completed")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Complete
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

export default Appointments;