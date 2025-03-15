const mongoose = require("mongoose");

const ClaimLogSchema = new mongoose.Schema({
    userId: { type: String, default: null }, // Null for guest users
    ip: { type: String, required: true },
    fingerprint: { type: String, required: true },
    claimedAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("ClaimLog", ClaimLogSchema);
