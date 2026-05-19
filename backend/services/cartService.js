const Cart = require("../models/Cart");
const Product = require("../models/Product");

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

const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  await cart.populate("products.product");
  return formatCart(cart);
};

const addToCart = async (userId, productId, quantity) => {
  const parsedQty = Number(quantity);
  const product = await Product.findById(productId);
  if (!product) return { error: "Product not found" };
  if (product.stock < parsedQty) return { error: "Insufficient stock" };

  const cart = await getOrCreateCart(userId);
  const existing = cart.products.find((item) => productRefId(item) === productId);

  if (existing) {
    existing.quantity += parsedQty;
  } else {
    cart.products.push({ product: productId, quantity: parsedQty });
  }

  await cart.save();
  await cart.populate("products.product");
  return formatCart(cart);
};

const updateCartItem = async (userId, productId, quantity) => {
  const parsedQty = Number(quantity);
  if (parsedQty < 1) return { error: "Quantity must be at least 1" };

  const cart = await getOrCreateCart(userId);
  const item = cart.products.find((entry) => productRefId(entry) === productId);

  if (!item) return { error: "Cart item not found" };

  item.quantity = parsedQty;
  await cart.save();
  await cart.populate("products.product");
  return formatCart(cart);
};

const removeCartItem = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);
  cart.products = cart.products.filter((entry) => productRefId(entry) !== productId);
  await cart.save();
  await cart.populate("products.product");
  return formatCart(cart);
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
