import { ALL_ORDERS_FAILURE, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAILURE, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAILURE, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants.js'

import axios from 'axios';

// Create Order
export const createOrder = (order) => async (dispatch) => {
  console.log(order)
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDERS_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/me/orders");
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAILURE,
      payload: error,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  try {

    const { data } = await axios.get(`/api/v1/order/${id}`);
    // console.log(data)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: error,
    });
  }
};

// ADMIN ONLY
// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");
    // console.log(data)

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      {status},
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    // console.log(data)
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};