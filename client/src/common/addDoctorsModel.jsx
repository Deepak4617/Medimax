import React from "react";

const AddDoctorModal = ({
  showModal,
  setShowModal,
  userDetail,
  handleChange,
  handleSubmit
}) => {

  if (!showModal) return null;

  return (

    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/30 z-50">

      <div className="bg-white p-6 rounded shadow w-96">

        <h3 className="text-xl font-bold mb-4">
          Add Doctor
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={userDetail.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetail.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userDetail.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userDetail.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={userDetail.specialization}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default AddDoctorModal;