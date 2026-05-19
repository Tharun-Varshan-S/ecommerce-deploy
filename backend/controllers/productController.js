const asyncHandler = require("../middleware/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const {
  listProducts,
  getProductById: getProductByIdService,
  createProduct: createProductService,
  updateProduct: updateProductService,
  deleteProduct: deleteProductService,
} = require("../services/productService");

const getProducts = asyncHandler(async (req, res) => {
  const { search = "", category = "", featured = "", trending = "" } = req.query;
  const products = await listProducts({ search, category, featured, trending });
  sendResponse(res, products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  sendResponse(res, product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await createProductService(req.body);
  sendResponse(res, product, 201);
});

const updateProduct = asyncHandler(async (req, res) => {
  const updated = await updateProductService(req.params.id, req.body);
  if (!updated) {
    res.status(404);
    throw new Error("Product not found");
  }
  sendResponse(res, updated);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await deleteProductService(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  sendResponse(res, { message: "Product removed" });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
