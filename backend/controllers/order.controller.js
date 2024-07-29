import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create new Order
const newOrder = asyncHandler(async (req, res, next) => {
  const { shippingInfo, orderInfo, paymentInfo, prices } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderInfo,
    paymentInfo,
    prices,
    user: req.user._id,
  });

  res
    .status(200)
    .json(new ApiResponse(201, order, "Order Created Successfully"));
});

// get one order
const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ApiError(404, "Order not yet done!"));
  }

  res
    .status(200)
    .json(new ApiResponse(201, order, "Order fetched Successfully"));
});

// getting order for user
const myOrders = asyncHandler(async (req, res, next) => {
  const allOrder = await Order.find({ user: req.user._id });

  if (!allOrder) {
    return next(new ApiError(404, "No Order Placed yet!"));
  }

  res
    .status(200)
    .json(new ApiResponse(201, allOrder, "Order fetched Successfully"));
});

// get all orders --Admin
const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.prices.totalPrice;
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { orders, totalAmount },
        "Order fetched Successfully"
      )
    );
});

// update Order Status --Admin
const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ApiError(404,"Order not found, Try another ID "))
  }

  if (order.orderStatus === "Delivered") {
    return next(new ApiError(404, "You have already delivered this Order"));
  }

  order.orderInfo.forEach(async (or) => {
    await updateStock(or.product, or.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredOn = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json(new ApiResponse(201, {}, ""));
});

async function updateStock(pdtId, quantity) {
  const product = await Product.findById(pdtId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order --Admin
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ApiError(404, "Order not found!"));
  }

  order.deleteOne();
  res.status(200).json(new ApiResponse(201,{},"Order deleted Successfully"))
});

export { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder ,deleteOrder };
