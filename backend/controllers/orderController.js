const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || !items.length) {
    res.status(400);
    throw new Error("Order items are required");
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error("A product in your cart does not exist");
    }

    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.title}`);
    }

    product.stock -= item.quantity;
    await product.save();

    orderItems.push({
      product: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    });
    totalAmount += product.price * item.quantity;
  }

  const order = await Order.create({
    userId: req.user._id,
    items: orderItems,
    shippingAddress,
    totalAmount,
    orderStatus: "Pending",
  });

  await Cart.findOneAndUpdate({ userId: req.user._id }, { $set: { products: [] } });

  res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("userId", "name email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.userId._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }

  res.json(order);
});

module.exports = { createOrder, getOrders, getOrderById };
