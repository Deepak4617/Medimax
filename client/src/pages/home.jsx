import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../common/featureCard";

const Home = () => {
  
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-900">MediMax AI</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link
            to="/login"
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section FULL SCREEN */}
      <section className="flex flex-1 flex-col md:flex-row items-center justify-between px-12 py-20 bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-[90vh]">
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Smart Hospital Management Powered by AI 🤖
          </h2>
          <p className="text-lg mb-8">
            Streamline hospital operations, manage patients, appointments,
            billing, and doctors — all in one intelligent system.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-green-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-blue-900"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Hospital Illustration"
            className="w-96 mx-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-12 py-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="Doctor Management" desc="Manage doctors easily." />
          <FeatureCard title="Appointment System" desc="Smart booking tracking." />
          <FeatureCard title="Billing & Payments" desc="Generate invoices & payments." />
          <FeatureCard title="AI Assistant" desc="AI suggests symptoms & summaries." />
          <FeatureCard title="Patient Records" desc="Secure digital medical history." />
          <FeatureCard title="Analytics Dashboard" desc="Track revenue & growth." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
        © 2026 MediMax AI. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;

