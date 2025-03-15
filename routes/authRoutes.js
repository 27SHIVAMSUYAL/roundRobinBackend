const express = require("express");
const { signup, login, guestLogin } =require( "../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/guest-login", guestLogin);

module.exports = router;
