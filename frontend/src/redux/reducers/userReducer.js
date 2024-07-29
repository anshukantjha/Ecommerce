// src/reducers/userReducer.js
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
  RESET_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_FAILURE,
} from "../constants/userConstants";

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
        error: "",
      };

    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: "",
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const passInitialState = {
  loading: false,
  isMailSent: false,
  isPassReset: false,
  error: "",
};

const passwordReducer = (state = passInitialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isMailSent: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isPassReset: action.payload,
      };

    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error:action.payload
      };

    default:
      return state;
  }
};

export { userReducer,passwordReducer };
