// src/actions/productActions.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "../constants/productConstants";
import axios from "axios";

// Fetch all products
export const fetchProducts = (keyword="",page=1,price=[0,30000],category,ratings=1) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    let url =`/api/v1/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      url =`/api/v1/products/?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }
    const response = await axios.get(url);
    console.log(response.data)
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Fetch single product
export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const response = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message });
  }
};

