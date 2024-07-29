import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/reducers/productsReducer";
import productReducer from "./redux/reducers/productReducer"
import {passwordReducer, userReducer} from "./redux/reducers/userReducer";

const rootReducer = {
  products: productsReducer,
  product:productReducer,
  user:userReducer,
  password:passwordReducer,
};

const store = configureStore({ reducer: rootReducer 

});

export default store;
