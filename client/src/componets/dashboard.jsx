import React from "react";
import Sidebar from "./sideBar";
import Navbar from "./navBar";
import StatsCard from "./startsCard";

const Dashboard = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen">
                    <Navbar />

                    <div className="p-8 grid grid-cols-4 gap-6">
                        <StatsCard title="Total Doctors" value="25" />
                        <StatsCard title="Total Patients" value="180" />
                        <StatsCard title="Appointments" value="56" />
                        <StatsCard title="Revenue" value="₹2,50,000" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;