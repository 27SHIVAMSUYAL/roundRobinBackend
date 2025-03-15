const express = require("express");
const { addCoupon, deleteCoupon, viewCoupons , adminLogin} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addCoupon);
router.delete("/delete/:id", authMiddleware, deleteCoupon);
router.get("/view", authMiddleware, viewCoupons);
router.post("/login", adminLogin);

module.exports = router;
