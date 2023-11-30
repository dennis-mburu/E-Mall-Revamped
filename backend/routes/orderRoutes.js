import express from "express";
import {
  createNewOrder,
  getMyOrders,
  payOrder,
  getAllOrders,
  getOrderById,
  deliverOrder,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, admin, getAllOrders)
  .post(protect, createNewOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", payOrder);
router.put("/:id/deliver", protect, admin, deliverOrder);

export default router;
