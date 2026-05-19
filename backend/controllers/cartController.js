const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

const formatCart = (cart) => ({
  _id: cart._id,
  userId: cart.userId,
  products: cart.products.filter((item) => item.product).map((item) => ({
    product: item.product,
    quantity: item.quantity,
  })),
});

const productRefId = (entry) => entry.product?._id?.toString() || entry.product.toString();

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("products.product");
  if (!cart) cart = await Cart.create({ userId, products: [] });
  return cart;
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  await cart.populate("products.product");
  res.json(formatCart(cart));
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const parsedQty = Number(quantity);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.stock < parsedQty) {
    res.status(400);
    throw new Error("Insufficient stock");
  }

  const cart = await getOrCreateCart(req.user._id);
  const existing = cart.products.find((item) => productRefId(item) === productId);

  if (existing) {
    existing.quantity += parsedQty;
  } else {
    cart.products.push({ product: productId, quantity: parsedQty });
  }

  await cart.save();
  await cart.populate("products.product");
  res.status(201).json(formatCart(cart));
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const parsedQty = Number(quantity);

  if (parsedQty < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1");
  }

  const cart = await getOrCreateCart(req.user._id);
  const item = cart.products.find((entry) => productRefId(entry) === productId);

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  item.quantity = parsedQty;
  await cart.save();
  await cart.populate("products.product");
  res.json(formatCart(cart));
});

const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.products = cart.products.filter((entry) => productRefId(entry) !== req.params.id);
  await cart.save();
  await cart.populate("products.product");
  res.json(formatCart(cart));
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
