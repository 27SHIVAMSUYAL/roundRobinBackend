const rateLimit = require("express-rate-limit");

const couponLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1, // Allow only one coupon claim per hour
    message: "Too many requests, please try again later."
});

module.exports = couponLimiter;
