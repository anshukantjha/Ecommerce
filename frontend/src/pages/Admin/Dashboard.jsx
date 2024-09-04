import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getAdminProduct } from "../../redux/actions/productAction.js";
import { getAllOrders } from "../../redux/actions/orderAction.js";
import { getAllUsers } from "../../redux/actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders?.forEach((item) => {
    totalAmount += item.prices.totalPrice;
  });

  return (
    <Box display="flex" bgcolor="#f4f6f8" minHeight="100vh">
      <Helmet>
        <title>Dashboard - Admin Panel</title>
      </Helmet>
      <Sidebar />
      <Box
        flexGrow={1}
        p={4}
        sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <CardContent>
                <Typography>Total Amount</Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  ₹{totalAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{ backgroundColor: "info.main", color: "info.contrastText" }}
            >
              <CardContent>
                <Link
                  to="/admin/products"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography>Products</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {products?.length}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "success.main",
                color: "success.contrastText",
              }}
            >
              <CardContent>
                <Link
                  to="/admin/orders"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography>Orders</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {orders?.length}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "warning.main",
                color: "warning.contrastText",
              }}
            >
              <CardContent>
                <Link
                  to="/admin/users"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography>Users</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {users?.length}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={4}>
          {/* <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Line data={lineState} />
              </CardContent>
            </Card>
          </Grid> */}
          {/* <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Doughnut data={doughnutState} />
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
