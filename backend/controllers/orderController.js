import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc - Create a New Order
// @route - POST /api/orders
// @access - Private
const createNewOrder = asyncHandler(async (req, res) => {
  // res.send("Create New Order");
  const orderItems = req.body.cartItems.map((item) => ({
    ...item,
    product: item._id,
  }));
  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = req.body;

  const newOrder = new Order({
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    user: req.user._id,
  });

  console.log({ newOrder });

  if (newOrder) {
    try {
      const savedOrder = await newOrder.save();
      console.log({ savedOrder });
      res.status(201).json(savedOrder);
    } catch (error) {
      console.log(error);
      throw new Error("Error Saving Order");
    }
  } else {
    throw new Error("Error Placing Order!");
  }
});

// @desc - Get all orders of the logged in User
// @route - Get /api/orders/myorders
// @access - Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get logged in user's orders");
});

// @desc - Pay for an Order
// @route - PUT /api/orders/:id/pay
// @access - Private
const payOrder = asyncHandler(async (req, res) => {
  res.send("Pay for an Order");
});

// @desc - Get all Orders
// @route - GET /api/orders
// @access - Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send("Get all Orders");
});

// @desc - Get Order by Id
// @route - GET /api/orders/:id
// @access - Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send("Get Order by Id");
});

// @desc - Mark Order as Delivered
// @route - PUT /api/orders/:id/deliver
// @access - Private
const deliverOrder = asyncHandler(async (req, res) => {
  res.send("Mark Order as delivered");
});

export {
  createNewOrder,
  getMyOrders,
  payOrder,
  getAllOrders,
  getOrderById,
  deliverOrder,
};
