// routes/products.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const errorHandler = require("../middleware/errorMiddleware");

// Retrieve all products
router.get("/", getProducts);

// Create a new product (accessible to all authenticated users)
router.post("/createProduct", authMiddleware ,createProduct);

// Retrieve a specific product by ID
router.get("/:id", getProductById);

// Update a product by ID (accessible to all authenticated users)
router.put("/:id",authMiddleware, updateProduct);

// Delete a product by ID (accessible to all authenticated users)
router.delete("/:id",authMiddleware, deleteProduct);

// Error handling middleware for this route
router.use(errorHandler);

module.exports = router;
