const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 📦 Place Order
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount: cart.totalPrice,
    });

    // Clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📦 Get My Orders (User)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product");

    res.json(orders);

  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// 📦 Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    res.json(orders);

  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// 🚚 Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });

  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
