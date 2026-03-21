import React, { useState, useEffect } from "react";

import Sidebar from "../../componets/sideBar";
import getAllPatients from "../../services/api/patient/getAllPatients";
import getAllDoctors from "../../services/api/doctor/getAllDoctors";

import getAllBills from "../../services/api/billing/getAllBills";
import useCustomDispatch from "../../hooks/useCustomDispatch";
import BillModel from "../../common/billModel";

import Loader from "../../common/loader2";
import { useAuthSelector } from "../../services/selector/authSelector";

const Billing = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useCustomDispatch();

  const { getAllBillsResponse } = useAuthSelector();
  const billsData = getAllBillsResponse?.data?.bills || [];

  // Calculate billing stats
  const totalRevenue = billsData.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0
  );

  const paidBillsAmount = billsData
    .filter((bill) => bill.paymentStatus === "Paid")
    .reduce((sum, bill) => sum + bill.totalAmount, 0);

  const pendingBillsAmount = billsData
    .filter((bill) => bill.paymentStatus !== "Paid")
    .reduce((sum, bill) => sum + bill.totalAmount, 0);

  useEffect(() => {

    dispatch(getAllPatients());
    dispatch(getAllDoctors());
    dispatch(getAllBills())

  }, [dispatch]);

  return (
    <>
      <div className="md:flex h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen overflow-y-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

            <h2 className="text-xl sm:text-2xl font-bold">
              Billing Dashboard
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              + Create Bill
            </button>

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center sm:text-left">
              <h4 className="text-gray-500 text-sm sm:text-base">
                Total Revenue
              </h4>

              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
                ₹{totalRevenue}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center sm:text-left">
              <h4 className="text-gray-500 text-sm sm:text-base">
                Pending Bills
              </h4>

              <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">
                ₹{pendingBillsAmount}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center sm:text-left">
              <h4 className="text-gray-500 text-sm sm:text-base">
                Paid Bills
              </h4>

              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                ₹{paidBillsAmount}
              </p>
            </div>

          </div>

          {/* SEARCH */}
          <div className="mb-4">

            <input
              type="text"
              placeholder="Search patient..."
              className="border p-2 rounded w-full sm:w-64"
            />

          </div>

          {/* TABLE */}
          <div className="bg-white rounded shadow overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Patient</th>
                  <th className="p-3 border">Doctor</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>

              <tbody>

                {getAllBillsResponse?.loading && (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      <Loader />
                    </td>
                  </tr>
                )}

                {billsData.map((bill) => (

                  <tr key={bill._id} className="hover:bg-gray-50">

                    <td className="p-3 border">
                      {bill.patientId?.name || "Patient Deleted"}
                    </td>

                    <td className="p-3 border">
                      {bill.doctorId?.name || "Doctor Deleted"}
                    </td>

                    <td className="p-3 border font-semibold text-green-600">
                      ₹{bill.totalAmount}
                    </td>

                    <td className="p-3 border">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${bill.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {bill.paymentStatus}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <BillModel
        showModal={showModal}
        setShowModal={setShowModal}
      />

    </>
  );
};

export default Billing;