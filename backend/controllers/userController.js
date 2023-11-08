import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc - Authenticate User & get token
// @route - POST /api/users/login
// @access - Public
const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

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
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    res.status(400);
    throw new Error("User already exixts");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(406);
    throw new Error("Invalid Credentials");
  }
});

// @desc - LogOut user and clear cookie
// @route - POST /api/users/logout
// @access - private
const logOutUser = asyncHandler(async (req, res) => {
  // set jwt cookie to empty string
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200);
  res.json({ message: "Logged out successfully" });
});

// @desc - Get User Profile
// @route - GET /api/users/profile
// @access - private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc - Update User Profile
// @route - PUT /api/users/profile
// @access - private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
