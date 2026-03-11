const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// 🔹 Get MongoDB URI
const URI = process.env.MONGODB_URI;

// 🔹 Debug check
if (!URI) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1); // Stop server immediately
}

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 20000,
      family: 4, // 🔥 Forces IPv4 (important for mobile hotspot)
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDb;