import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getAllDoctors from "../../services/api/doctor/getAllDoctors";
import Sidebar from "../../componets/sideBar";

import Loader from "../../common/loader2";
import useCustomDispatch from "../../hooks/useCustomDispatch";

import { useAuthSelector } from "../../services/selector/authSelector";

const Doctors = () => {

  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const { getAllDoctorsResponse } = useAuthSelector();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const doctors = getAllDoctorsResponse?.data?.doctors || [];

  const handleBookAppointment = (doctor) => {
    navigate("/patient/book-appointment", { state: { doctor } });
  };

  return (
    <div className="md:flex h-screen bg-gray-100 overflow-hidden">

      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-x-auto">

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          Doctors List
        </h2>

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="min-w-[650px] w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-2 md:p-4">Doctor</th>
                <th className="p-2 md:p-4">Specialization</th>
                <th className="p-2 md:p-4">Email</th>
                <th className="p-2 md:p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {getAllDoctorsResponse?.loading && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    <Loader />
                  </td>
                </tr>
              )}

              {doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-2 md:p-4 font-medium">
                    {doctor.name || "Doctor Delete"}
                  </td>

                  <td className="p-2 md:p-4">
                    {doctor.specialization}
                  </td>

                  <td className="p-2 md:p-4 break-all">
                    {doctor.email}
                  </td>

                  <td className="p-2 md:p-4">
                    <button
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-1 rounded text-xs md:text-sm"
                    >
                      Book Appointment
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

export default Doctors;