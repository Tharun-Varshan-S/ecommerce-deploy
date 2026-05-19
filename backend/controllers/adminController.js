const Order = require("../models/Order");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { getAllOrders, getAllUsers };
