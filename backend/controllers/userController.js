import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc - Authenticate User & get token
// @route - POST /api/users/login
// @access - Public
const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set jwt token as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect email or password");
  }
});

// @desc - Register/Create new User & get token
// @route - POST /api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

// @desc - LogOut user and clear cookie
// @route - POST /api/users/logout
// @access - private
const logOutUser = asyncHandler(async (req, res) => {
  res.send("logout User");
});

// @desc - Get User Profile
// @route - GET /api/users/profile
// @access - private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get User Profile");
});

// @desc - Update User Profile
// @route - PUT /api/users/profile
// @access - private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

// @desc - Get all users
// @route - GET /api/users
// @access - Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  res.send("Get all users");
});

// @desc - Get user by ID
// @route - GET /api/users/:id
// @access - Private/Admin
const getUserbyId = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

// @desc - Delete all users
// @route - Delete /api/users
// @access - Private/Admin
const deleteAllUsers = asyncHandler(async (req, res) => {
  res.send("Delete all users");
});

// @desc - Delete user by ID
// @route - DELETE /api/users/:id
// @access - Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  res.send("Delete User by ID");
});

// @desc - update User
// @route - PUT /api/users/:id
// @access - Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
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
};