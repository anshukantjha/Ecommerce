import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { myOrders } from "../../redux/actions/orderAction";
import { Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const OrderPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  // Select the orders from the Redux store
  const { orders, loading } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Order ID", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Delivered" ? "success" : "warning"}
          variant="outlined"
        />
      ),
    },
    { field: "itemQty", headerName: "Item Quantity", width: 150 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <Typography color={theme.palette.primary.main}>
          ₹{params.value.toFixed(2)}
        </Typography>
      ),
    },
  ];

  // Transform orders into rows for the DataGrid
  const rows = orders.map((order) => ({
    id: order._id,
    status: order.orderStatus,
    itemQty: order.orderItems.reduce((acc, item) => acc + item.quantity, 0),
    amount: order.prices.totalPrice,
  }));

  return (
    <Box sx={{ height: 400, width: "100%", padding: "20px", marginBottom:"60px"}}>
      <Typography variant="h4" gutterBottom color="primary" textAlign="center">
        My Orders
      </Typography>
      {loading ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : (
        <>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            sx={{
              backgroundColor: 'theme.palette.background.paper',
              boxShadow: theme.shadows[2],
              borderRadius: "10px",
              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: 'red',
                color:'green',
                fontSize: "16px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            }}
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </>
      )}
    </Box>
  );
};

export default OrderPage;
