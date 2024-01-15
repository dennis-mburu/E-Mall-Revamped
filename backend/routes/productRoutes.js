import express from "express";
import {
  createNewProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProductById,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get(
//   "/",
//   // asyncHandler(async (req, res) => {
//   //   const products = await Product.find({});
//   //   res.json(products);
//   // })

// );

// router.route('/').get(getAllProducts)
router.get("/", getAllProducts);
// router.get("/:id", getProductById);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.post("/", protect, admin, createNewProduct);
router.post("/:id/reviews", protect, createProductReview);

export default router;
