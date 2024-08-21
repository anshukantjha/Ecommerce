import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
  UPDATE_ITEM_QUANTITY
} from "../constants/cartConstants";

import axios from "axios";

export const updateItemQuantity = (id, quantity) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_QUANTITY,
    payload: { id, quantity },
  });
};


export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    const product = data.data;
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.public_url,
        stock: product.stock,
        ratings:product.ratings,
        quantity,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeItemsFromCart = (id) => async (dispatch,getState) => {
  try {
   
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};
