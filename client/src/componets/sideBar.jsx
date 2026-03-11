import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBill,
  FaTachometerAlt,
  FaUser
} from "react-icons/fa";

const Sidebar = () => {

  const location = useLocation();

  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const role = user?.role;

  /* ------------------ MENU CONFIG ------------------ */

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
    { name: "Appoinment History", path: "/patient/appointment-history", icon: <FaUserMd /> },
    { name: "Appointments", path: "/patient/appointments", icon: <FaCalendarCheck /> },
    { name: "Book Appoinment", path: "/patient/book-appointment", icon: <FaUser /> },
    { name: "Doctor", path: "/patient/doctors", icon: <FaUser /> },
    { name: "Profile", path: "/patient/profile", icon: <FaUser /> },
    { name: "Billing", path: "/patient/billing", icon: <FaUser /> },

  ];

  /* ------------------ ROLE MENU ------------------ */

  let menu = [];

  if (role === "admin") {
    menu = adminMenu;
  }

  if (role === "doctor") {
    menu = doctorMenu;
  }

  if (role === "patient") {
    menu = patientMenu;
  }

  return (

    <div className="w-64 h-screen bg-blue-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Hospital Panel
      </h1>

      {menu.map((item) => (

        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 p-3 mb-3 rounded
          ${
            location.pathname === item.path
              ? "bg-blue-600"
              : "hover:bg-blue-700"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>

      ))}

    </div>
  );
};

export default Sidebar;