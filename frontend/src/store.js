// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/reducers/productsReducer";
import productReducer from "./redux/reducers/productReducer";
import { passwordReducer, userReducer } from "./redux/reducers/userReducer";
import { cartReducer } from "./redux/reducers/cartReducer";

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
  },
  preloadedState,
});

// Save state to localStorage whenever it changes
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export default store;
