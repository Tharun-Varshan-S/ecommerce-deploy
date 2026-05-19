const express = require("express");
const { body, param } = require("express-validator");
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  [
    body("items").isArray({ min: 1 }).withMessage("Order items are required"),
    body("items.*.product").isMongoId().withMessage("Valid product id is required"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("shippingAddress.fullName").trim().notEmpty().withMessage("Full name is required"),
    body("shippingAddress.address").trim().notEmpty().withMessage("Address is required"),
    body("shippingAddress.city").trim().notEmpty().withMessage("City is required"),
    body("shippingAddress.postalCode").trim().notEmpty().withMessage("Postal code is required"),
    body("shippingAddress.country").trim().notEmpty().withMessage("Country is required"),
    validate,
  ],
  createOrder
);
router.get("/", getOrders);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Valid order id is required"), validate],
  getOrderById
);

module.exports = router;
