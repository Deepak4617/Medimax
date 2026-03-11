import React from "react";
import { Routes, Route } from "react-router-dom";

import * as Pages from "../pages";
import * as AdminPage from "../pages/admin";
import * as DoctorPage from "../pages/doctors";
import * as PatientPage from "../pages/patient";

import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminPage.AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute role="admin"><AdminPage.Doctors /></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute role="admin"><AdminPage.Patients /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute role="admin"><AdminPage.Appointments /></ProtectedRoute>} />
      <Route path="/admin/billing" element={<ProtectedRoute role="admin"><AdminPage.Billing /></ProtectedRoute>} />

      {/* DOCTOR */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorPage.DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute role="doctor"><DoctorPage.Appointments /></ProtectedRoute>} />
      <Route path="/doctor/patients" element={<ProtectedRoute role="doctor"><DoctorPage.Patients /></ProtectedRoute>} />

      {/* PATIENT */}
      <Route path="/patient/dashboard" element={<ProtectedRoute role="patient"><PatientPage.PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/book-appointment" element={<ProtectedRoute role="patient"><PatientPage.BookAppointment /></ProtectedRoute>} />
      <Route path="/patient/appointment-history" element={<ProtectedRoute role="patient"><PatientPage.AppointmentHistory /></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><PatientPage.Appointments /></ProtectedRoute>} />
      <Route path="/patient/doctors" element={<ProtectedRoute role="patient"><PatientPage.Doctors /></ProtectedRoute>} />
      <Route path="/patient/profile" element={<ProtectedRoute role="patient"><PatientPage.Profile /></ProtectedRoute>} />
      <Route path="/patient/billing" element={<ProtectedRoute role="patient"><PatientPage.PatientBilling /></ProtectedRoute>} />


    </Routes>
  );
};

export default AppRoutes;