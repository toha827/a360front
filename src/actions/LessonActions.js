import {
  GET_LESSON,
  GET_LESSONS,
  GET_MY_LESSONS,
  GET_LESSON_BY_ID,
  GET_MY_COURSES_PROGRESS,
} from "../types";
import {
  getLessons,
  getMyLessons,
  getLessonsOfCourse,
  getLessonByIdApi,
} from "../api";

export const getCourses = (user) => async (dispatch) => {
  dispatch({
    type: `${GET_LESSONS}_PENDING`,
  });
  try {
    const response = await getLessons();
    if (response && response.status === 200) {
      dispatch({
        type: `${GET_LESSONS}_SUCCESS`,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: `${GET_LESSONS}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_LESSONS}_FAILURE`,
      payload: err.response.data.errors,
      error: true,
    });
  }
};

export const getMyCourses = (id) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: `${GET_MY_LESSONS}_PENDING`,
  });
  try {
    const response = await getMyLessons(id);
    console.log(response);
    if (response && response.status === 200) {
      dispatch({
        type: `${GET_MY_LESSONS}_SUCCESS`,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: `${GET_MY_LESSONS}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_LESSONS}_FAILURE`,
      payload: err.response,
      error: true,
    });
  }
};

export const getMyCoursesProgress = (id) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: `${GET_MY_COURSES_PROGRESS}_PENDING`,
  });
  try {
    const response = await getMyLessons(id);
    console.log(response);
    if (response && response.status === 200) {
      dispatch({
        type: `${GET_MY_COURSES_PROGRESS}_SUCCESS`,
        payload: response.data,
      });
    } else {
      dispatch({
        type: `${GET_MY_COURSES_PROGRESS}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_MY_COURSES_PROGRESS}_FAILURE`,
      payload: err.response,
      error: true,
    });
  }
};

export const getLessonsByCourse = (id, userId) => async (dispatch) => {
  console.log(id, userId);
  dispatch({
    type: `${GET_LESSON}_PENDING`,
  });
  try {
    const response = await getLessonsOfCourse(id);
    console.log(response);
    if (response && response.status === 200) {
      dispatch(getLessonById(response.data.data[0].id, userId));

      dispatch({
        type: `${GET_LESSON}_SUCCESS`,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: `${GET_LESSON}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_LESSONS}_FAILURE`,
      payload: err.response,
      error: true,
    });
  }
};

export const getLessonById = (id, userId) => async (dispatch) => {
  console.log(id, userId);
  dispatch({
    type: `${GET_LESSON_BY_ID}_PENDING`,
  });
  try {
    const response = await getLessonByIdApi(id, userId);
    if (response && response.status === 200) {
      console.log(response);
      dispatch({
        type: `${GET_LESSON_BY_ID}_SUCCESS`,
        payload: response.data,
      });
    } else {
      dispatch({
        type: `${GET_LESSON_BY_ID}_FAILURE`,
        payload: true,
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: `${GET_LESSON_BY_ID}_FAILURE`,
      payload: err.response,
      error: true,
    });
  }
};
