import { useState } from "react";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { CreditCardOffOutlined, Event } from "@mui/icons-material";
import { VpnKeyOutlined } from "@mui/icons-material";
import { createOrder } from "../redux/actions/orderAction.js";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import CheckoutSteps from "../components/checkoutSteps.jsx";
import Loader from "../components/Loader.jsx";

const PaymentPage = () => {
  const [afterPayment, setAfterPayment] = useState(false);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    prices: {
      itemPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    },
  };

  const submitHandler = async (e) => {
    // console.log(`Inside submit Handler`);
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Data of payment/process`, data);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      // console.log(`Result ,`, result);

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            paidAt: Date.now(),
          };
          console.log(`order inside Payment Page`, order);
          dispatch(createOrder(order));
          setAfterPayment(true);
          navigate("/order/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps activeStep={2} />
      {afterPayment ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Typography className="text-2xl font-semibold text-center mb-4">
              Card Info
            </Typography>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CreditCardOffOutlined />
                <CardNumberElement className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <Event />
                <CardExpiryElement className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <VpnKeyOutlined />
                <CardCvcElement className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <button
                type="submit"
                ref={payBtn}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Pay - ₹{orderInfo && orderInfo.totalPrice}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
