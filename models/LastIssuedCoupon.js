const mongoose = require("mongoose");

const lastIssuedSchema = new mongoose.Schema({
    index: { type: Number, required: true, default: -1 }
});

module.exports = mongoose.model("LastIssuedCoupon", lastIssuedSchema);
