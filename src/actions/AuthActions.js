import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../types";
import { loginAPI, signUpApi } from "../api";

export const signIn = user => async dispatch => {
  dispatch({
    type: `${SIGN_IN}_PENDING`
  });
  try {
    const response = await loginAPI(user);
    console.log(response)
    if (response && response.status === 200 && typeof response.data !== "string" ) {
      dispatch({
        type: `${SIGN_IN}_SUCCESS`,
        payload: response.data
      });
    } else {
      dispatch({
        type: `${SIGN_IN}_FAILURE`,
        payload: true,
        error: true
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${SIGN_IN}_FAILURE`,
      payload: err.response.data.errors,
      error: true
    });
  }
};

export const signUp = (user) => async dispatch => {
  dispatch({
    type: `${SIGN_UP}_PENDING`
  });
  try {
    const response = await signUpApi(user);
    if (response && response.status === 200) {
      dispatch({
        type: `${SIGN_UP}_SUCCESS`,
        payload: response.data
      });
    } else {
      dispatch({
        type: `${SIGN_UP}_FAILURE`,
        payload: true,
        error: true
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${SIGN_IN}_FAILURE`,
      payload: err.response.data.errors,
      error: true
    });
  }
}

export const signOut = () => async dispatch => {
  dispatch({
    type: `${SIGN_OUT}`
  });
  
};
