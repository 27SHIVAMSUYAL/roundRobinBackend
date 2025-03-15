const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const authMiddleware = require("../middleware/authMiddleware");
const authUserMiddleware = require("../middleware/authUserMiddleware");
router.get("/available", couponController.getAvailableCoupons);

router.post("/issue/loggedin", authUserMiddleware, couponController.issueCouponForLoggedInUser);
router.post("/issue/guest", couponController.issueCouponForGuest);
router.get("/issued", couponController.getIssuedCoupons);

module.exports = router;
