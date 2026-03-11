import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../../componets/sideBar";

import getDoctorAppoinments from "../../services/api/doctor/getDoctorAppoinments";

const Patients = () => {

  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await dispatch(getDoctorAppoinments()).unwrap();
        setAppointments(res.appointments || []);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, [dispatch]);

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          My Patients
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
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

                    <td className="p-4 font-medium">
                      {p?.patient?.name || 'Patinet Delete'}
                    </td>

                    <td className="p-4">
                      {p?.patient?.email}
                    </td>

                    <td className="p-4">
                      {p?.patient?.phone || "-"}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded text-white text-sm ${
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