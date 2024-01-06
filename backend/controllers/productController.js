import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc - Fetch all products
// @route - GET /api/products
// @access - Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc - Fetch product by Id
// @route - GET /api/products/:id
// @access - Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not Found");
  }
});

// @desc - Create New Product
// @route - POST /api/products/
// @access - Public
const createNewProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: "Sample Name",
    brand: "Sample Brand",
    image: "/image/sample.jpg",
    category: "Sample Category",
    description: "Sample Description",
  });

  const newSavedProduct = await newProduct.save();
  res.status(201).json(newSavedProduct);
});

export { getAllProducts, getProductById, createNewProduct };
