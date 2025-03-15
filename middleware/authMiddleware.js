const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Received Auth Header:", authHeader); // Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Access Denied: No Token Provided");
        return res.status(403).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        console.log("Verified Admin:", verified); // Debugging
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: "Invalid Token" });
    }
};
