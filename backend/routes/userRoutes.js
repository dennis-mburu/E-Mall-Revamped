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

const router = express.Router();

router.route("/").get(getAllUsers).post(registerUser).delete(deleteAllUsers);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").get(getUserbyId).delete(deleteUserById).put(updateUser);

router.post("/login", logInUser);

router.post("/logout", logOutUser);

export default router;
