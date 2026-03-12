import React from "react";

import Cookies from "js-cookie";
import Sidebar from "../../componets/sideBar";

const Profile = () => {

  const userCookie = Cookies.get("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  return (

    <div className="md:flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Patient Profile
        </h2>

        <div className="bg-white shadow rounded-lg p-6 max-w-md">

          <p className="mb-3">
            <b>Name:</b> {user?.name || "N/A"}
          </p>

          <p className="mb-3">
            <b>Email:</b> {user?.email || "N/A"}
          </p>

          <p className="mb-3">
            <b>Phone:</b> {user?.phone || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default Profile;