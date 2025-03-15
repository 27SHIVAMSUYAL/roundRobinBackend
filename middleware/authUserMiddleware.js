const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Received User Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Access Denied: No User Token Provided");
        return res.status(403).json({ message: "User Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", verified);

        if (verified.isAdmin) {
            console.log("Access Denied: Admin Token Used for User Route");
            return res.status(403).json({ message: "This route is for users only" });
        }

        req.user = verified;
        console.log("Verified User:", verified);
        next();
    } catch (error) {
        console.error("User JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid User Token" });
    }
};
