import React, { useEffect, useState } from "react";

import Sidebar from "../../componets/sideBar";
import getAllDoctors from "../../services/api/doctor/getAllDoctors";
import addDoctors from "../../services/api/doctor/addDoctors";
import deleteDoctor from "../../services/api/doctor/deleteDoctor";

import Loader from "../../common/loader2";
import AddDoctorModal from "../../common/addDoctorsModel";
import DeleteConfirmModal from "../../common/deleteConfirmModel";
import useCustomDispatch from "../../hooks/useCustomDispatch";

import { useAuthSelector } from "../../services/selector/authSelector";

const Doctors = () => {

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    specialization: ""
  };

  const dispatch = useCustomDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [userDetail, setUserDetail] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const { getAllDoctorsResponse } = useAuthSelector();
  const doctors = getAllDoctorsResponse?.data?.doctors || [];

  const handleDeleteClick = (id) => {
    setSelectedDoctorId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteDoctor = async () => {
    try {

      await dispatch(deleteDoctor(selectedDoctorId)).unwrap();

      setShowDeleteModal(false);
      setSelectedDoctorId(null);

      dispatch(getAllDoctors());

    } catch (error) {
      console.log("Delete doctor error:", error);
    }
  };

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        await dispatch(getAllDoctors()).unwrap();
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    fetchDoctors();

  }, [dispatch]);

  const handleChange = (e) => {

    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await dispatch(addDoctors(userDetail)).unwrap();

      setUserDetail(initialFormData);

      setShowModal(false);

      dispatch(getAllDoctors());

    } catch (error) {

      console.log("Add doctor error:", error);

    }

  };

  return (

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

            <h2 className="text-xl sm:text-2xl font-bold">
              Doctors Management
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Add Doctor
            </button>

          </div>

          <div className="bg-white shadow rounded-lg overflow-x-auto">

            <table className="min-w-full text-left">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Specialization</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {getAllDoctorsResponse?.loading && (
                  <tr>
                    <td colSpan="4" className="text-center p-6">
                      <Loader />
                    </td>
                  </tr>
                )}

                {!getAllDoctorsResponse?.loading && doctors.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No Doctors Found
                    </td>
                  </tr>
                )}

                {doctors.map((doc) => (

                  <tr
                    key={doc._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {doc.name}
                    </td>

                    <td className="p-4">
                      {doc.email}
                    </td>

                    <td className="p-4">
                      {doc.specialization}
                    </td>

                    <td className="p-4 text-center">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => handleDeleteClick(doc._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      <AddDoctorModal
        showModal={showModal}
        setShowModal={setShowModal}
        userDetail={userDetail}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteDoctor}
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor?"
      />

    </div>

  );
};

export default Doctors;