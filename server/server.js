require('dotenv').config();
const express = require("express");
const cors = require("cors");

// 🔹 Import DB connection
const connectDb = require("./utils/database/db");

// 🔹 Import Routes
const authRoute = require("./routes/authRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes")
const billingRoutes = require("./routes/billingRoutes");
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// 🔹 CORS Configuration
const corsOptions = {
  origin: [
    "https://medimaxai-1zle.onrender.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};


// ✅ VERY IMPORTANT — allow preflight
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================

app.use("/api/auth", authRoute);
app.use("/api/appointments", appointmentsRoutes);

app.use("/api", doctorRoutes);

app.use("/api", patientRoutes);
app.use("/api/billing", billingRoutes);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("Hospital Management API Running...");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });