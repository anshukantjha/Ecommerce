import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic"

const options= {
  timeout:5000,
  positions:positions.BOTTOM_RIGHT,
  transitions:transitions.FADE
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options} >
        <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
);
