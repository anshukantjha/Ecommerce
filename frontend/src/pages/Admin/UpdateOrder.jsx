import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button, Typography, Select, MenuItem } from "@mui/material";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/orderAction";
import { Loader } from "../../components";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";
import { AccountTreeOutlined } from "@mui/icons-material";

const ProcessOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    
    dispatch(updateOrder(params.id, status));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id, isUpdated, updateError]);

  return (
    <>
      <Helmet>
        <title>Process Order</title>
      </Helmet>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-100">
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-8">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-gray-700"
                >
                  Shipping Info
                </Typography>
                <div className="space-y-2">
                  <div className="flex">
                    <p className="font-medium text-gray-600">Name:</p>
                    <span className="ml-2 text-gray-800">
                      {order.user && order.user.name}
                    </span>
                  </div>
                  <div className="flex">
                    <p className="font-medium text-gray-600">Phone:</p>
                    <span className="ml-2 text-gray-800">
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className="flex">
                    <p className="font-medium text-gray-600">Address:</p>
                    <span className="ml-2 text-gray-800">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-gray-700"
                >
                  Payment
                </Typography>
                <div className="space-y-2">
                  <div>
                    <p
                      className={`font-medium ${
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <div className="flex">
                      <p className="font-medium text-gray-600">Total Amount:</p>
                      <span className="ml-2 text-gray-800">
                        {order.prices && `₹${order.prices.totalPrice}`}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="font-medium text-gray-600">
                        Tax + Shipping:
                      </p>
                      <span className="ml-2 text-gray-800">
                        {order.prices &&
                          `₹${
                            order.prices.taxPrice + order.prices.shippingPrice
                          }`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-gray-700"
                >
                  Order Status
                </Typography>
                <div>
                  <p
                    className={`font-medium ${
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>

              <div>
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-gray-700"
                >
                  Your Cart Items:
                </Typography>
                <div className="space-y-4">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={item.image}
                          alt="Product"
                          className="w-20 h-20 object-cover rounded"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <span className="text-gray-800">
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Process Order Section */}
              {order.orderStatus !== "Delivered" && (
                <div className="mt-10">
                  <form
                    onSubmit={updateOrderSubmitHandler}
                    className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                  >
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-700"
                    >
                      Process Order
                    </Typography>

                    <div className="flex items-center space-x-4">
                      <AccountTreeOutlined className="text-gray-600" />
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        fullWidth
                        className="bg-white"
                      >
                        <MenuItem value="">
                          <em>Choose Status</em>
                        </MenuItem>
                        {order.orderStatus === "Processing" && (
                          <MenuItem value="Shipped">Shipped</MenuItem>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        )}
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading || status === ""}
                      className="mt-4"
                    >
                      Process Order
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
