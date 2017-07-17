import * as types from './actionTypes';
// Importování mockovaného API, později lze přepsání cesty from použít funkce pro získávání dat ze skutečného API
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses))
    }).catch(error => {
      throw (error);
    });
  }
}