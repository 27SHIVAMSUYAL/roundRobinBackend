const Admin = require("../models/adminModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Coupon = require("../models/Coupon");


exports.addCoupon = async (req, res) => {
    try {
        const { name, category, count } = req.body;

        if (!name || !category || !count) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if coupon already exists
        let existingCoupon = await Coupon.findOne({ name });

        if (existingCoupon) {
            // If coupon exists, update count
            existingCoupon.count += count;
            await existingCoupon.save();
        } else {
            // Create a new coupon
            const newCoupon = new Coupon({ name, category, count });
            await newCoupon.save();
        }

        res.json({ message: "Coupon added successfully!" });
    } catch (error) {
        console.error("Error adding coupon:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: "Coupon deleted!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting coupon" });
    }
};

exports.viewCoupons = async (_, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons" });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the admin in the database
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token for admin
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
