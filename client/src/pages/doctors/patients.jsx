import React, { useEffect } from "react";

import Sidebar from "../../componets/sideBar";

import getDoctorAppoinments from "../../services/api/doctor/getDoctorAppoinments";

import useCustomDispatch from "../../hooks/useCustomDispatch";
import { useAuthSelector } from "../../services/selector/authSelector";

const Patients = () => {

  const dispatch = useCustomDispatch();

  const { getDoctorAppoinmentsResponse } = useAuthSelector();

  const appointments =
    getDoctorAppoinmentsResponse?.data?.appointments || [];

  useEffect(() => {

    dispatch(getDoctorAppoinments());

  }, [dispatch]);

  return (

    <div className="md:flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-4 md:p-8">

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          My Patients
        </h2>

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="w-full min-w-[600px] text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-2 md:p-4">Name</th>
                <th className="p-2 md:p-4">Email</th>
                <th className="p-2 md:p-4">Phone</th>
                <th className="p-2 md:p-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {appointments.length === 0 ? (

                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No patient found
                  </td>
                </tr>

              ) : (

                appointments.map((p) => (

                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-2 md:p-4 font-medium">
                      {p?.patient?.name || "Patient Deleted"}
                    </td>

                    <td className="p-2 md:p-4 break-words">
                      {p?.patient?.email}
                    </td>

                    <td className="p-2 md:p-4">
                      {p?.patient?.phone || "-"}
                    </td>

                    <td className="p-2 md:p-4">

                      <span
                        className={`px-2 md:px-3 py-1 rounded text-white text-xs md:text-sm ${
                          p.status === "pending"
                            ? "bg-yellow-500"
                            : p.status === "approved"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {p.status}
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

export default Patients;