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
} from "./pages/index";
import axios from "axios";
import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
