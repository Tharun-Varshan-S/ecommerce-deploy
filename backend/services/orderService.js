const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async ({ userId, items, shippingAddress }) => {
  if (!items || !items.length) return { error: "Order items are required" };

  const orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) return { error: "A product in your cart does not exist" };
    if (product.stock < item.quantity) return { error: `Insufficient stock for ${product.title}` };

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
    userId,
    items: orderItems,
    shippingAddress,
    totalAmount,
    orderStatus: "Pending",
  });

  await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });
  return order;
};

const getOrders = async (userId) => Order.find({ userId }).sort({ createdAt: -1 });

const getOrderById = async (orderId) =>
  Order.findById(orderId).populate("userId", "name email");

module.exports = { createOrder, getOrders, getOrderById };
