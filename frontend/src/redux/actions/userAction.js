import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILURE, payload: error.message });
  }
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    const data = await axios.post("/api/v1/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const { data } = await axios.put("/api/v1/me/update", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response.data.message || error.message,
    });
  }
};
export const updatePassword = (allPassword) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST });
  try {
    const { data } = await axios.put("/api/v1/password/update", allPassword);
    console.log(data);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message || error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.response.data.message || error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post(
      "/api/v1/password/forgot",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(data);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
  }
};
export const resetPassword = (token, allPasswords) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      allPasswords,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(data);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
  }
};
