const Product = require("../models/Product");

// 🛒 Add Product (Admin Only)
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      brand,
      stock,
      weight,
      suitableCrop
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      brand,
      stock,
      weight,
      suitableCrop,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// 📦 Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");

    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📦 Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// 🗑 Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
