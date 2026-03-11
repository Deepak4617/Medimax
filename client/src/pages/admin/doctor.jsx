import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "../../componets/navBar";
import Sidebar from "../../componets/sideBar";

import getAllDoctors from "../../services/api/doctor/getAllDoctors";
import addDoctors from "../../services/api/doctor/addDoctors";
import deleteDoctor from "../../services/api/doctor/deleteDoctor";

import { useAuthSelector } from "../../services/selector/authSelector";
import Loader from "../../common/loader2";
import AddDoctorModal from "../../common/addDoctorsModel";
import DeleteConfirmModal from "../../common/deleteConfirmModel";

const Doctors = () => {

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    specialization: ""
  };

  const dispatch = useDispatch();
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

    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Navbar */}
        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Doctors Management
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Doctor
            </button>

          </div>

          {/* ================= TABLE ================= */}

          <div className="bg-white shadow rounded-lg overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-50 border-b">

                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Specialization</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {/* Loading */}

                {getAllDoctorsResponse?.loading && (

                  <tr>
                    <td colSpan="4" className="text-center p-6">
                      <Loader />
                    </td>
                  </tr>

                )}

                {/* No Data */}

                {!getAllDoctorsResponse?.loading && doctors.length === 0 && (

                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No Doctors Found
                    </td>
                  </tr>

                )}

                {/* Doctors List */}

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

                    <td className="p-4 flex justify-center gap-3">

                      <button
                        onClick={() => handleDeleteClick(doc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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

      </div>

      {/* ================= ADD DOCTOR MODAL ================= */}

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