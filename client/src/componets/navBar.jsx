import React from "react";
import Cookies from "js-cookie";

const Navbar = () => {

  const user = JSON.parse(Cookies.get("user") || "{}");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between">

      <h1 className="text-xl font-bold">Hospital Dashboard</h1>

      <div>
        <span className="mr-4">{user?.name}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Navbar;