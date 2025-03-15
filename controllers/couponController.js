const Coupon = require("../models/Coupon");
const LastIssuedCoupon = require("../models/LastIssuedCoupon");
const IssuedCoupon = require("../models/issuedCoupon");
const User = require("../models/User");



// 🔹 Generate a unique coupon code
const generateUniqueCode = (couponName) => {
    return `${couponName}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// 🔹 Get next available coupon using round-robin logic
const getNextAvailableCoupon = async () => {
    const allCoupons = await Coupon.find().sort({ _id: 1 });

    if (allCoupons.length === 0) return null; // No coupons exist

    let lastIssued = await LastIssuedCoupon.findOne();
    if (!lastIssued) {
        lastIssued = await LastIssuedCoupon.create({ index: -1 });
    }

    let attempts = 0;
    const totalCoupons = allCoupons.length;

    while (attempts < totalCoupons) {
        lastIssued.index = (lastIssued.index + 1) % totalCoupons; // Move to next coupon
        const selectedCoupon = allCoupons[lastIssued.index];

        if (selectedCoupon.count > 0) {
            selectedCoupon.count -= 1;
            await selectedCoupon.save();
            await lastIssued.save();
            return selectedCoupon;
        }

        attempts++;
    }

    return null; // No available coupon found
};

// 🔹 Check if a user is eligible for a new coupon
const isUserEligible = (lastIssuedTime) => {
    if (!lastIssuedTime) return true; // First-time claim allowed

    const oneHourLater = new Date(lastIssuedTime.getTime() + 60 * 60 * 1000);
    const currentTime = new Date();

    return currentTime >= oneHourLater ? true : oneHourLater;
};

// ✅ Issue Coupon for Logged-in Users
exports.issueCouponForLoggedInUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Check eligibility
        const eligibilityResult = isUserEligible(user.lastCouponIssuedAt);
        if (eligibilityResult !== true) {
            const remainingTime = Math.ceil((eligibilityResult - new Date()) / (60 * 1000)); // Minutes left
            return res.status(403).json({ message: `You can claim a coupon in ${remainingTime} minutes.` });
        }

        const selectedCoupon = await getNextAvailableCoupon();
        if (!selectedCoupon) {
            return res.status(400).json({ message: "No available coupons to issue." });
        }

        const uniqueCode = generateUniqueCode(selectedCoupon.name);
        await IssuedCoupon.create({ name: selectedCoupon.name, uniqueCode });

        user.lastCouponIssuedAt = new Date();
        await user.save();

        res.json({ message: "Coupon issued successfully!", uniqueCode });
    } catch (error) {
        console.error("Error while issuing coupon:", error);
        res.status(500).json({ message: "Server error while issuing coupon!", error });
    }
};



const { Redis } = require("@upstash/redis");

// Initialize Redis correctly
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Function to issue a guest coupon with IP and fingerprint tracking
exports.issueCouponForGuest = async (req, res) => {
    try {
        const { guestId, fingerprint } = req.body;

        if (!guestId || !fingerprint) {
            return res.status(400).json({ message: "Guest ID and fingerprint are required!" });
        }

        // Get user's IP address
        const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        // Check if guest has already claimed a coupon
        const existingCouponByIP = await redis.get(`coupon:ip:${userIp}`);
        const existingCouponByFingerprint = await redis.get(`coupon:fp:${fingerprint}`);

        if (existingCouponByIP || existingCouponByFingerprint) {
            return res.status(400).json({ message: "Coupon already claimed!" });
        }

        // Select next available coupon using round-robin
        const selectedCoupon = await getNextAvailableCoupon();
        if (!selectedCoupon) {
            return res.status(400).json({ message: "No available coupons to issue." });
        }

        // Generate a unique coupon code
        const uniqueCode = generateUniqueCode(selectedCoupon.name);

        // Save issued coupon in the database
        await IssuedCoupon.create({ name: selectedCoupon.name, uniqueCode });

        // Store the issued coupon details in Redis (expires in 1 hour)
        await redis.set(guestId, uniqueCode, { ex: 3600 });
        await redis.set(`coupon:ip:${userIp}`, uniqueCode, { ex: 3600 });
        await redis.set(`coupon:fp:${fingerprint}`, uniqueCode, { ex: 3600 });

        return res.status(200).json({ message: "Coupon issued successfully!", uniqueCode });
    } catch (error) {
        console.error("Error while issuing guest coupon:", error);
        return res.status(500).json({ message: "Server error while issuing coupon!", error: error.message });
    }
};




// ✅ Get Available Coupons (count > 0)
exports.getAvailableCoupons = async (req, res) => {
    try {
        const availableCoupons = await Coupon.find({ count: { $gt: 0 } });
        res.status(200).json(availableCoupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching available coupons", error });
    }
};

// ✅ Get All Issued Coupons
exports.getIssuedCoupons = async (req, res) => {
    try {
        const issuedCoupons = await IssuedCoupon.find();
        res.status(200).json(issuedCoupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching issued coupons", error });
    }
};
