const Product = require("../models/Product");

const listProducts = async ({ search = "", category = "", featured = "", trending = "" }) => {
  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = { $regex: `^${category}$`, $options: "i" };
  if (featured === "true") query.featured = true;
  if (trending === "true") query.trending = true;

  return Product.find(query).sort({ createdAt: -1 });
};

const getProductById = async (id) => Product.findById(id);

const createProduct = async (payload) => Product.create(payload);

const updateProduct = async (id, payload) => {
  const product = await Product.findById(id);
  if (!product) return null;
  Object.assign(product, payload);
  return product.save();
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) return null;
  await product.deleteOne();
  return product;
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
