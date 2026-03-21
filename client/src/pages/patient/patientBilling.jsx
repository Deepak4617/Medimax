import React, { useEffect, useState } from "react";

import Sidebar from "../../componets/sideBar";
import getAllBills from "../../services/api/billing/getAllBills";
import payPatientBill from "../../services/api/billing/payPatientBill";

import useCustomDispatch from "../../hooks/useCustomDispatch";
import jsPDF from "jspdf";
import Loader from "../../common/loader2";

import { useAuthSelector } from "../../services/selector/authSelector";

const PatientBilling = () => {

    const dispatch = useCustomDispatch();

    const { getAllBillsResponse } = useAuthSelector();

    const bills = getAllBillsResponse?.data?.bills || [];

    const [selectedBill, setSelectedBill] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getAllBills());
    }, [dispatch]);

    const handlePayBill = (id) => {
        dispatch(payPatientBill(id)).then(() => {
            dispatch(getAllBills());
        });
    };

    const openBillDetails = (bill) => {
        setSelectedBill(bill);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBill(null);
    };

    // 📄 Download PDF
    const downloadPDF = (bill) => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Hospital Invoice", 20, 20);

        doc.setFontSize(12);
        doc.text(`Doctor: ${bill?.doctorId?.name}`, 20, 40);
        doc.text(`Status: ${bill?.status}`, 20, 50);

        let y = 70;

        doc.text("Items:", 20, y);
        y += 10;

        bill?.items?.forEach((item) => {
            doc.text(`${item.name} - ₹${item.price}`, 20, y);
            y += 10;
        });

        y += 10;

        doc.text(`Total Amount: ₹${bill.totalAmount}`, 20, y);

        doc.save(`bill-${bill._id}.pdf`);
    };

    return (
        <div className="md:flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6 overflow-x-auto">

                <h2 className="text-xl md:text-2xl font-bold mb-6">
                    My Bills
                </h2>

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="min-w-[600px] w-full border text-left">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 md:p-3 border">Doctor</th>
                                <th className="p-2 md:p-3 border">Amount</th>
                                <th className="p-2 md:p-3 border">Status</th>
                                <th className="p-2 md:p-3 border">Action</th>
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

                            {bills?.map((bill) => (
                                <tr key={bill._id} className="hover:bg-gray-50">

                                    <td className="p-2 md:p-3 border">
                                        {bill?.doctorId?.name || "Doctor Delete"}
                                    </td>

                                    <td className="p-2 md:p-3 border font-semibold text-green-600">
                                        ₹{bill.totalAmount}
                                    </td>

                                    <td className="p-2 md:p-3 border">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs md:text-sm ${bill.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {bill.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="p-2 md:p-3 border flex flex-wrap gap-2">

                                        <button
                                            onClick={() => openBillDetails(bill)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            View
                                        </button>

                                        {bill?.paymentStatus === "Pending" ? (

                                            <button
                                                onClick={() => handlePayBill(bill._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Pay
                                            </button>

                                        ) : (

                                            <span className="text-green-600 font-semibold text-sm">
                                                Paid
                                            </span>

                                        )}

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {showModal && selectedBill && (

                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                        <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-lg">

                            <h2 className="text-lg md:text-xl font-bold mb-4">
                                Bill Details
                            </h2>

                            <p className="mb-2">
                                <strong>Doctor:</strong> {selectedBill?.doctorId?.name}
                            </p>

                            <p className="mb-4">
                                <strong>Status:</strong> {selectedBill?.status}
                            </p>

                            <div className="overflow-x-auto">

                                <table className="w-full border mb-4 min-w-[300px]">

                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-2">Item</th>
                                            <th className="border p-2">Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {selectedBill?.items?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">{item.name}</td>
                                                <td className="border p-2">₹{item.price}</td>
                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            <div className="text-right font-bold text-lg mb-4">
                                Total: ₹{selectedBill?.totalAmount}
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-3">

                                <button
                                    onClick={() => downloadPDF(selectedBill)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                >
                                    Download PDF
                                </button>

                                <div className="flex gap-2">

                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                                    >
                                        Close
                                    </button>

                                    {selectedBill?.status === "Pending" && (

                                        <button
                                            onClick={() => handlePayBill(selectedBill._id)}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                        >
                                            Pay Bill
                                        </button>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </div>
    );
};

export default PatientBilling;