const Order = require("../models/Order");
const User = require("../models/User");

const getAllOrders = async () =>
  Order.find({}).populate("userId", "name email").sort({ createdAt: -1 });

const getAllUsers = async () => User.find({}).select("-password").sort({ createdAt: -1 });

module.exports = { getAllOrders, getAllUsers };
