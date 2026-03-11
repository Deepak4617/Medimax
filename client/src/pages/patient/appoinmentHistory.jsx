import React from "react";

const AppointmentHistory = () => {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Appointment History
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Doctor</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="text-center border-t">
            <td className="p-2">Dr. Sharma</td>
            <td className="p-2">10 Mar</td>
            <td className="p-2">10:00 AM</td>
            <td className="p-2 text-green-500">Completed</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
};

export default AppointmentHistory;