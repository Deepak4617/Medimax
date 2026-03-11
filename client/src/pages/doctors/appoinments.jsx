import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../../componets/sideBar";

import getDoctorAppoinments from "../../services/api/doctor/getDoctorAppoinments";
import updateAppointmentStatus from "../../services/api/doctor/updateAppoinmentsStatus";

const Appointments = () => {

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


  const handleStatusUpdate = async (id, status) => {

    try {

      await dispatch(updateAppointmentStatus({ id, status })).unwrap();

      const res = await dispatch(getDoctorAppoinments()).unwrap();
      setAppointments(res.appointments || []);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          My Appointments
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}

              {appointments.map((a) => (

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
                    {a.time}
                  </td>

                  {/* Status */}
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

                  {/* Actions */}
                  <td className="p-4 space-x-2">

                    <button
                      onClick={() => handleStatusUpdate(a._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(a._id, "pending")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(a._id, "completed")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
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