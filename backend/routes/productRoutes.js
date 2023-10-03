import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// router.get(
//   "/",
//   // asyncHandler(async (req, res) => {
//   //   const products = await Product.find({});
//   //   res.json(products);
//   // })

// );

// router.route('/').get(getAllProducts)
router.get('/', getAllProducts)
router.get("/:id", getProductById);

export default router;