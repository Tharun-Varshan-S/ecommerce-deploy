const express = require("express");
const { body } = require("express-validator");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

const productValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("image").trim().notEmpty().withMessage("Image URL is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be 0 or more"),
  body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
  validate,
];

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, productValidation, createProduct);
router.put("/:id", protect, admin, productValidation, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
