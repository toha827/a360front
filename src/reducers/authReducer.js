import initialState from "./initialState";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../types";
import authService from "../services/authService";

export const authReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case `${SIGN_IN}_PENDING`:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: false,
      };
    case `${SIGN_IN}_SUCCESS`:
      authService.saveId(action.payload.user_id);
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
        error: false,
      };
    case `${SIGN_IN}_FAILURE`:
      return {
        ...state,
        error: true,
        isAuthenticated: false,
        isLoading: false,
      };
    case `${SIGN_UP}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${SIGN_UP}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
      };
    case `${SIGN_UP}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case `${SIGN_OUT}`:
      return {
        ...state,
        isLoading: false,
        user: {
          token: "",
        },
        error: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const isRehydrated = (state = initialState, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return { ...state };
    default:
      return state;
  }
};
