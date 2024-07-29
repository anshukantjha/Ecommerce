// src/reducers/productsReducer.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../constants/productConstants";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
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

    case FETCH_PRODUCTS_FAILURE:
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
