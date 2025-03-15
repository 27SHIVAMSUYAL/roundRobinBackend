require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/adminModel");

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
        console.log("Admin already exists.");
        process.exit();
    }

    const newAdmin = new Admin({
        username: "admin",
        password: "securepassword123" // you can Change this password!
    });

    await newAdmin.save();
    console.log("Admin created successfully.");
    process.exit();
}

createAdmin();
