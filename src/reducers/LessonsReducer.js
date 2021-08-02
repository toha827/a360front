import initialState from "./initialState";
import {
  GET_LESSONS,
  GET_MY_LESSONS,
  GET_LESSON,
  GET_LESSON_BY_ID,
  GET_MY_COURSES_PROGRESS,
} from "../types";

export const LessonsReducer = (state = initialState.lessons, action) => {
  switch (action.type) {
    case `${GET_LESSONS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${GET_LESSONS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        lessons: action.payload,
        error: false,
      };
    case `${GET_LESSONS}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case `${GET_MY_LESSONS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${GET_MY_LESSONS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        myLessons: action.payload,
      };
    case `${GET_MY_LESSONS}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case `${GET_MY_COURSES_PROGRESS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${GET_MY_COURSES_PROGRESS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        myCoursesProgress: action.payload,
      };
    case `${GET_MY_COURSES_PROGRESS}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case `${GET_LESSON}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${GET_LESSON}_SUCCESS`:
      const lessons = {
        lessons: action.payload,
      };
      return {
        ...state,
        isLoading: false,
        lesson: lessons,
        error: false,
      };
    case `${GET_LESSON}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case `${GET_LESSON_BY_ID}_PENDING`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case `${GET_LESSON_BY_ID}_SUCCESS`:
      const lesson = {
        ...state.lesson,
        ...action.payload,
      };
      return {
        ...state,
        isLoading: false,
        lesson: lesson,
        error: false,
      };
    case `${GET_LESSON_BY_ID}_FAILURE`:
      return {
        ...state,
        error: true,
        isLoading: false,
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
