const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

// 🔒 Admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin 🔥",
    user: req.user,
  });
});

module.exports = router;
