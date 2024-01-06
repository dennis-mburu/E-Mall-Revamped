import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc - Fetch all products
// @route - /api/products
// @access - Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc - Fetch product by Id
// @route - /api/products/:id
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
// @route - /api/products/
// @access - Public
const createNewProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description } = req.body;

  const newProduct = new Product({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
  });

  const newSavedProduct = await newProduct.save();
  res.status(201).json(newSavedProduct);
});

export { getAllProducts, getProductById, createNewProduct };
