import express from "express";
import {
  logInUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserbyId,
  deleteAllUsers,
  deleteUserById,
  updateUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getAllUsers)
  .post(protect, admin, registerUser)
  .delete(protect, admin, deleteAllUsers);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserbyId)
  .delete(protect, admin, deleteUserById)
  .put(protect, admin, updateUser);

router.post("/login", logInUser);

router.post("/logout", logOutUser);

export default router;
