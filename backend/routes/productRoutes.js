import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
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
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);
router.post("/", protect, admin, createNewProduct);

export default router;
