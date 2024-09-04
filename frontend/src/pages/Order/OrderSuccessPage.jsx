import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const OrderSuccess = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
      p={4}
    >
      <CheckCircleOutline sx={{ fontSize: 80, color: "green", mb: 2 }} />

      <Typography variant="h5" gutterBottom>
        Your Order has been placed successfully!
      </Typography>

      <Link
        to="/orders"
        style={{
          marginTop: 16,
          textDecoration: "none",
          color: "#fff",
          backgroundColor: "#3f51b5",
          padding: "10px 20px",
          borderRadius: 4,
          fontWeight: "bold",
        }}
      >
        View Orders
      </Link>
    </Box>
  );
};

export default OrderSuccess;
