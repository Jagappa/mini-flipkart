const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 Protect Middleware
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// 🔒 Admin Only Middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};

// ✅ Export BOTH
module.exports = { protect, adminOnly };
