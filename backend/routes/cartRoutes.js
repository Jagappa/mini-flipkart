const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Add to cart
router.post("/", protect, addToCart);

// Get cart
router.get("/", protect, getCart);

module.exports = router;
