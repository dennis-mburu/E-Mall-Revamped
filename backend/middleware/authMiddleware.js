import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token Verification failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token!");
  }
});

// This does not have to be an async function
const admin = asyncHandler(async function (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
});

export { protect, admin };
