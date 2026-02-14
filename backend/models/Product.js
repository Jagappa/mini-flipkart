const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Seeds",
        "Fertilizers",
        "Pesticides",
        "Machinery",
        "Organic",
        "Irrigation"
      ],
    },

    brand: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    weight: {
      type: String,   // Example: 5kg, 10kg
    },

    suitableCrop: {
      type: String,   // Example: Rice, Wheat, Cotton
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
