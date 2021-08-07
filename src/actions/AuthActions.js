import { GET_USER_COURSE_STATUS, SIGN_IN, SIGN_OUT, SIGN_UP } from "../types";
import { loginAPI, signUpApi, userCourseStatusAPI } from "../api";

export const signIn = (user) => async (dispatch) => {
  dispatch({
    type: `${SIGN_IN}_PENDING`,
  });
  try {
    const response = await loginAPI(user);
    console.log(response);
    if (
      response &&
      response.status === 200 &&
      typeof response.data !== "string"
    ) {
      dispatch({
        type: `${SIGN_IN}_SUCCESS`,
        payload: response.data,
      });
    } else {
      dispatch({
        type: `${SIGN_IN}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${SIGN_IN}_FAILURE`,
      payload: err.response.data.errors,
      error: true,
    });
  }
};

export const userCourseStatus = (id) => async (dispatch) => {
  dispatch({
    type: `${GET_USER_COURSE_STATUS}_PENDING`,
  });
  try {
    const response = await userCourseStatusAPI(id);
    console.log(response);
    if (
      response &&
      response.status === 200 &&
      typeof response.data !== "string"
    ) {
      dispatch({
        type: `${GET_USER_COURSE_STATUS}_SUCCESS`,
        payload: response.data,
      });
    } else {
      dispatch({
        type: `${GET_USER_COURSE_STATUS}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_USER_COURSE_STATUS}_FAILURE`,
      payload: err.response.data.errors,
      error: true,
    });
  }
};

export const signUp = (user) => async (dispatch) => {
  dispatch({
    type: `${SIGN_UP}_PENDING`,
  });
  try {
    const response = await signUpApi(user);
    if (response && response.status === 200) {
      dispatch({
        type: `${SIGN_UP}_SUCCESS`,
        payload: response.data,
      });
    } else {
      dispatch({
        type: `${SIGN_UP}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${SIGN_IN}_FAILURE`,
      payload: err.response.data.errors,
      error: true,
    });
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({
    type: `${SIGN_OUT}`,
  });
};
