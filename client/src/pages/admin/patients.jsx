import React, { useEffect, useState } from "react";
import Sidebar from "../../componets/sideBar";

import getAllPatients from "../../services/api/patient/getAllPatients";
import deletePatient from "../../services/api/patient/deletePatinet";

import useCustomDispatch from "../../hooks/useCustomDispatch";
import DeleteConfirmModal from "../../common/deleteConfirmModel";

import { useAuthSelector } from "../../services/selector/authSelector";

const Patients = () => {

  const dispatch = useCustomDispatch();

  const { getAllPatientsResponse } = useAuthSelector();
  const patients = getAllPatientsResponse?.data?.patients || [];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedPatientId(id);
    setShowDeleteModal(true);
  };

  const confirmDeletePatient = async () => {
    try {

      await dispatch(deletePatient(selectedPatientId)).unwrap();

      setShowDeleteModal(false);
      setSelectedPatientId(null);

      dispatch(getAllPatients());

    } catch (error) {
      console.log("Delete patient error:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Patients List
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {patients.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}

              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {patient.name}
                  </td>

                  <td className="p-4">
                    {patient.email}
                  </td>

                  <td className="p-4">
                    {patient.phone}
                  </td>

                  <td className="p-4 flex justify-center">

                    <button
                      onClick={() => handleDeleteClick(patient._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeletePatient}
        title="Delete Patient"
        message="Are you sure you want to delete this patient?"
      />

    </div>
  );
};

export default Patients;