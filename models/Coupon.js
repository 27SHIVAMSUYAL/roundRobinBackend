const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique:true}, // Unique coupon name (e.g., "FOOD20")
    category: { type: String, required: true }, // Category of the coupon
    count: { type: Number, required: true, min: 0 } // Number of available coupons
});

module.exports = mongoose.model("Coupon", couponSchema);
