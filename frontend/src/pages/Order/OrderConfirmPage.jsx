import React from "react";
import { CheckoutSteps } from "../../components/index";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Paper, Divider } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const OrderSummaryItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 499 ? 0 : 40;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/order/payment");
  };

  return (
    <>
      <Helmet>
        <title>Confirm Order</title>
      </Helmet>
      <CheckoutSteps activeStep={1} />
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Shipping Info
            </Typography>
            <Divider />
            <div style={{ marginTop: "16px" }}>
              <OrderSummaryItem>
                <Typography variant="subtitle1">Name:</Typography>
                <Typography>{user.name}</Typography>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <Typography variant="subtitle1">Phone:</Typography>
                <Typography>{shippingInfo.phoneNo}</Typography>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <Typography variant="subtitle1">Address:</Typography>
                <Typography>{address}</Typography>
              </OrderSummaryItem>
            </div>
          </StyledPaper>

          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Your Cart Items
            </Typography>
            <Divider />
            <div style={{ marginTop: "16px" }}>
              {cartItems.map((item) => (
                <Grid container spacing={2} key={item.product}>
                  <Grid item xs={4} sm={3}>
                    <Link to={`/product/${item.product}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={8} sm={9} container alignItems="center">
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2">
                        <span>{item.quantity}</span> X ₹{item.price} = ₹
                        {item.quantity * item.price}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </div>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider />
            <div style={{ marginTop: "16px" }}>
              <OrderSummaryItem>
                <Typography>Subtotal:</Typography>
                <Typography>₹{subtotal}</Typography>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <Typography>Shipping Charges:</Typography>
                <Typography>₹{shippingCharges}</Typography>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <Typography>GST:</Typography>
                <Typography>₹{tax.toFixed(2)}</Typography>
              </OrderSummaryItem>
              <Divider style={{ margin: "16px 0" }} />
              <OrderSummaryItem>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">₹{totalPrice.toFixed(2)}</Typography>
              </OrderSummaryItem>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={proceedToPayment}
                style={{ marginTop: "16px" }}
              >
                Proceed To Payment
              </Button>
            </div>
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmOrder;
