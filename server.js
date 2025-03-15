require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fingerprint = require("express-fingerprint");

const couponRoutes = require("./routes/couponRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(fingerprint());

app.use("/api/coupons", couponRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
