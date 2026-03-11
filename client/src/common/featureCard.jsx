import React from "react";

const FeatureCard = ({ title, desc }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-4 text-blue-900">{title}</h4>
            <p>{desc}</p>
        </div>
    );
}

export default FeatureCard;