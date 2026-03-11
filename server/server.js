require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();


// 🔹 Import Routes
const authRoute = require("./routes/authRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes")
const billingRoutes = require("./routes/billingRoutes");

const connectDb = require("./utils/database/db");
const errorMiddleware = require('./middleware/errorMiddleware');

// 🔹 CORS Configuration
const corsOptions = {
  origin: [
    "https://medimaxai-1zle.onrender.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ VERY IMPORTANT — allow preflight
// app.options("/*", cors(corsOptions));


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================

app.use("/api/auth", authRoute);
app.use("/api/appointments", appointmentsRoutes);

app.use("/api", doctorRoutes);

app.use("/api", patientRoutes);
app.use("/api/billing", billingRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });