import { actionTypes } from "../types";
import { setAuthToken } from "../../utils/utils";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`/api/users/register`, userData)
    .then(res => history.push("/auth/login"))
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({ type: actionTypes.GET_ERRORS, payload: err.response.data })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object {}, which also sets isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};
