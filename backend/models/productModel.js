// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true, // Removes whitespace from both ends of the string
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a non-negative number"],
  },
  image: {
    type: String,
    validate: {
      validator: function (value) {
        // Regular expression for image URL validation
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: "Invalid image URL format",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
