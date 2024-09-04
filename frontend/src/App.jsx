import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Layout,
  LoginComponent,
  ProtectedRoute,
  RegisterComponent,
} from "./components/index";
import {
  IndexPage,
  AboutPage,
  ProductPage,
  ProductsPage,
  AccountPage,
  EditPage,
  OrderPage,
  PassUpdatePage,
  ForgotPassPage,
  ResetPassPage,
  CartPage,
  ShippingPage,
  PaymentPage,
  OrderConfirmPage,
  OrderSuccess,
  OrderDetailsPage,
  Dashboard,
  ProductList,
  CreateProduct,
  UpdateProduct,
  OrderList,
  UpdateOrder,
  UserList,
  UpdateUser,
  ReviewsList,
} from "./pages/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:keyword" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/password/forgot" element={<ForgotPassPage />} />
          <Route path="/password/reset/:token" element={<ResetPassPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/edit"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <PassUpdatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <OrderConfirmPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<CartPage />} />

          {stripeApiKey && (
            <Route
              path="/order/payment"
              element={
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <PaymentPage />
                  </Elements>
                </ProtectedRoute>
              }
            />
          )}
        </Route>
        {/* Admin routes  */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <ProtectedRoute isAdmin={true}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ReviewsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
