import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc - Fetch all products
// @route - GET /api/products
// @access - Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
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
// @access - Private/Admin
const createNewProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: "Sample Name",
    brand: "Sample Brand",
    image: "/images/sample.jpg",
    category: "Sample Category",
    description: "Sample Description",
  });

  const newSavedProduct = await newProduct.save();
  res.status(201).json(newSavedProduct);
});

// @desc - Update a Product
// @route - PUT /api/products/:id
// @access - Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);

  const { name, brand, category, description, price, countInStock, image } =
    req.body;

  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc - Delete a Product
// @route - DELETE /api/products
// @access - Private & Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc - Create a Product review
// @route - POST /api/products/:id/reviews
// @access - Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    console.log(alreadyReviewed);
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    } else {
      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment,
      };

      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((accum, review) => accum + review.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review Added Successfully" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
