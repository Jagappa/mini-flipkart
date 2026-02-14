const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 🛒 Smart Add To Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist → create
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists → increase quantity
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        // New product → add
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
        });
      }
    }

    // Recalculate total price
    let total = 0;

    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      total += prod.price * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();

    res.json({
      message: "Product added to cart successfully",
      cart,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📦 Get Logged-in User Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

     if (!cart || cart.items.length === 0) {
      return res.json({ message: "Cart is empty" });
    }

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
