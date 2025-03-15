const mongoose = require("mongoose");

const issuedCouponSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Coupon name (e.g., "FOOD20")
    uniqueCode: { type: String, required: true, unique: true }, // Unique code (e.g., "FOOD20-X7K3L9")
    issuedAt: { type: Date, default: Date.now }, // Time when issued
    status: { type: String, enum: ["issued", "claimed"], default: "issued" } // Status tracking
});

module.exports = mongoose.model("IssuedCoupon", issuedCouponSchema);
