import React, { useState } from "react";
import { useAuthSelector } from "../services/selector/authSelector";

import useCustomDispatch from "../hooks/useCustomDispatch";
import createBilling from "../services/api/billing/createBilling";

const BillModel = ({ showModal, setShowModal }) => {

    const dispatch = useCustomDispatch();

    const { getAllDoctorsResponse, getAllPatientsResponse } = useAuthSelector();
    const doctors = getAllDoctorsResponse?.data?.doctors || [];
    const patients = getAllPatientsResponse?.data?.patients || [];

    const [billData, setBillData] = useState({
        patientId: "",
        doctorId: "",
        items: [{ name: "", price: "" }]
    });

    const handleItemChange = (index, field, value) => {

        const updatedItems = [...billData.items];
        updatedItems[index][field] = value;

        setBillData({
            ...billData,
            items: updatedItems
        });

    };

    const addItem = () => {

        setBillData({
            ...billData,
            items: [...billData.items, { name: "", price: "" }]
        });

    };

    const handleCreateBill = () => {

        const payload = {
            patientId: billData.patientId,
            doctorId: billData.doctorId,
            items: billData.items.map((item) => ({
                name: item.name,
                price: Number(item.price)
            }))
        };

        dispatch(createBilling(payload))
            .unwrap()
            .then((res) => {

                console.log("Bill Created:", res);

                setShowModal(false);

                setBillData({
                    patientId: "",
                    doctorId: "",
                    items: [{ name: "", price: "" }]
                });

            })
            .catch((err) => {

                console.log("Error:", err);

            });

    };

    return <>
        {showModal && (

            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">

                    <h3 className="text-xl font-bold mb-4">
                        Create Bill
                    </h3>

                    <select
                        className="border p-2 sm:w-full mb-3 rounded text-sm mr-4"
                        value={billData.patientId}
                        onChange={(e) =>
                            setBillData({ ...billData, patientId: e.target.value })
                        }
                    >
                        <option value="">Select Patient</option>

                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>

                    {/* DOCTOR */}

                    <select
                        className="border p-2 sm:w-full mb-3 rounded text-sm"
                        value={billData.doctorId}
                        onChange={(e) =>
                            setBillData({ ...billData, doctorId: e.target.value })
                        }
                    >
                        <option value="">Select Doctor</option>

                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>

                    {/* ITEMS */}

                    {billData.items.map((item, index) => (

                        <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">

                            <input
                                type="text"
                                placeholder="Item Name"
                                className="border p-2 rounded w-full"
                                value={item.name}
                                onChange={(e) =>
                                    handleItemChange(index, "name", e.target.value)
                                }
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2 rounded w-full"
                                value={item.price}
                                onChange={(e) =>
                                    handleItemChange(index, "price", e.target.value)
                                }
                            />

                        </div>

                    ))}

                    <button
                        onClick={addItem}
                        className="text-blue-600 text-sm mb-4"
                    >
                        + Add Item
                    </button>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={() => setShowModal(false)}
                            className="px-3 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleCreateBill}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            Create Bill
                        </button>

                    </div>

                </div>

            </div>

        )}
    </>
}

export default BillModel