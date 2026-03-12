import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import authLogout from "../services/api/auth/authLogout";
import useCustomDispatch from "../hooks/useCustomDispatch";

const Navbar = () => {

  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(Cookies.get("user") || "{}");

  const handleLogout = async () => {
    try {

      const result = await dispatch(authLogout());

      if (result?.payload?.success) {
        navigate("/login");
      }

    } catch (error) {
      console.log("Logout failed", error);
    }
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