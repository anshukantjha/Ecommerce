// src/reducers/productsReducer.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAILURE,
} from "../constants/productConstants";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        resultPerPage: action.payload.resultPerPage,
        productsCount: action.payload.productsCount,
        filteredProductCount: action.payload.filteredProductCount,
        error: "",
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        error: ""
      }

    case FETCH_PRODUCTS_FAILURE:
    case ADMIN_PRODUCT_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
