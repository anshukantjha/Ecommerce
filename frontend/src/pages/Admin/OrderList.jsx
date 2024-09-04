import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
import { Helmet } from "react-helmet";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  // Fetch orders only once on component mount
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Handle errors and reset state when needed
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });

      // Re-fetch orders after deletion
      dispatch(getAllOrders());
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.value === "Delivered"
          ? "text-green-600"
          : params.value === "Processing"
          ? "text-yellow-600"
          : "text-red-600",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <Button
                variant="contained"
                color="primary"
                className="min-w-0 p-2 mr-2"
              >
                <EditIcon />
              </Button>
            </Link>

            <Button
              variant="contained"
              color="secondary"
              className="min-w-0 p-2"
              onClick={() => deleteOrderHandler(params.row.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.prices.totalPrice,
        status: item.orderStatus,
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>ALL ORDERS - Admin</title>
      </Helmet>

      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex-col p-4 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">All Orders</h1>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
