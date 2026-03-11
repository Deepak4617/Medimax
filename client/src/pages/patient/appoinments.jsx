import React, { useEffect } from "react";
import Sidebar from "../../componets/sideBar";
import { useDispatch } from "react-redux";

import getMyAppointments from "../../services/api/patient/getMyAppoinments";
import { useAuthSelector } from "../../services/selector/authSelector";
import Loader from "../../common/loader2";

const Appointments = () => {

    const dispatch = useDispatch();

    const { getMyAppoinmentsResponse } = useAuthSelector();

    useEffect(() => {
        dispatch(getMyAppointments());
    }, [dispatch]);

    const appointments = getMyAppoinmentsResponse?.data || [];

    const getStatusColor = (status) => {
        if (status === "pending") return "bg-yellow-100 text-yellow-700";
        if (status === "confirmed") return "bg-green-100 text-green-700";
        if (status === "cancelled") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-8">

                <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4">Doctor</th>
                                <th className="p-4">Specialization</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {getMyAppoinmentsResponse?.loading && (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        <Loader/>
                                    </td>
                                </tr>
                            )}

                            {appointments.map((appointment) => (
                                <tr
                                    key={appointment._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-4 font-medium">
                                        {appointment.doctor?.name || 'Doctor Delete'}
                                    </td>

                                    <td className="p-4">
                                        {appointment.doctor?.specialization}
                                    </td>

                                    <td className="p-4">
                                        {new Date(appointment.date).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        {appointment.time}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}
                                        >
                                            {appointment.status}
                                        </span>
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