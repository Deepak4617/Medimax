import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBill,
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = () => {

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const role = user?.role;

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
    { name: "Patients", path: "/admin/patients", icon: <FaUsers /> },
    { name: "Appointments", path: "/admin/appointments", icon: <FaCalendarCheck /> },
    { name: "Billing", path: "/admin/billing", icon: <FaMoneyBill /> },
  ];

  const doctorMenu = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: <FaTachometerAlt /> },
    { name: "Appointments", path: "/doctor/appointments", icon: <FaCalendarCheck /> },
    { name: "Patients", path: "/doctor/patients", icon: <FaUsers /> },
  ];

  const patientMenu = [
    { name: "Dashboard", path: "/patient/dashboard", icon: <FaTachometerAlt /> },
    { name: "Appointments", path: "/patient/appointments", icon: <FaCalendarCheck /> },
    { name: "Doctors", path: "/patient/doctors", icon: <FaUserMd /> },
    { name: "Profile", path: "/patient/profile", icon: <FaUser /> },
    { name: "Billing", path: "/patient/billing", icon: <FaMoneyBill /> },

  ];

  let menu = [];

  if (role === "admin") menu = adminMenu;
  if (role === "doctor") menu = doctorMenu;
  if (role === "patient") menu = patientMenu;

  return (
    <>
      {/* MOBILE TOP NAVBAR */}
      <div className="md:hidden flex items-center bg-blue-900 text-white p-4 shadow">

        <button onClick={() => setOpen(true)} className="mr-4">
          <FaBars size={22} />
        </button>

        <h1 className="text-lg font-semibold">
          Hospital Panel
        </h1>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-blue-900 text-white p-6 transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        {/* MOBILE CLOSE BUTTON */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h1 className="text-xl font-bold">Hospital Panel</h1>

          <FaTimes
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* DESKTOP TITLE */}
        <h1 className="text-2xl font-bold mb-10 hidden md:block">
          Hospital Panel
        </h1>

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 p-3 rounded mb-3 transition
            ${
              location.pathname === item.path
                ? "bg-blue-700"
                : "hover:bg-blue-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>

        ))}

      </div>
    </>
  );
};

export default Sidebar;