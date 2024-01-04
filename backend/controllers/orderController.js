import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc - Create a New Order
// @route - POST /api/orders
// @access - Private
const createNewOrder = asyncHandler(async (req, res) => {
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

  if (orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
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
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  }
});

// @desc - Get all orders of the logged in User
// @route - Get /api/orders/myorders
// @access - Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send("Get logged in user's orders");
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc - Pay for an Order
// @route - PUT /api/orders/:id/pay
// @access - Private
const payOrder = asyncHandler(async (req, res) => {
  // res.send("Pay for an Order");
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const savedOrder = await Order.save();
    res.status(200).json(savedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc - Get all Orders
// @route - GET /api/orders
// @access - Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  // res.send("Get all Orders");
  const orders = await Order.find({}).populate("user", "name email");
  res.status(200).json(orders);
});

// @desc - Get Order by Id
// @route - GET /api/orders/:id
// @access - Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
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
