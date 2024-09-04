// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/reducers/productsReducer";
import productReducer, { newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, reviewReducer } from "./redux/reducers/productReducer";
import { allUsersReducer, passwordReducer, profileReducer, updateReducer, userDetailsReducer, userReducer } from "./redux/reducers/userReducer";
import { cartReducer } from "./redux/reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./redux/reducers/orderReducer";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    user: userReducer,
    password: passwordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    update: profileReducer,
    profile: updateReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Save state to localStorage whenever it changes
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export default store;
