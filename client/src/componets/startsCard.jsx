import React from "react";
const StatsCard = ({ title, value }) => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <p className="text-2xl font-bold text-blue-900 mt-2">{value}</p>
            </div>
        </>
    );
}

export default StatsCard;