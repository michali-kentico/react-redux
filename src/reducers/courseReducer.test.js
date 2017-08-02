import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // Příprava iniciálního stavu a akce
    const initialState = [
      { title: 'A'},
      { title: 'B'}
    ];
    const newCourse = { title: 'C' };
    // Objekt s akcí by mohl být napsán ručně, ale vhodnější je použít implementované Action Creatory
    const action = actions.createCourseSuccess(newCourse);

    // Zavolání reduceru s iniciálním stavem a danou akcí
    const newState = courseReducer(initialState, action);

    // Porovnání nového stavu s očekávanými výsledky
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });
});


describe('Course Reducer', () => {
  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      { id: 'A', title: 'A'},
      { id: 'B', title: 'B'},
      { id: 'C', title: 'C'}
    ];
    const editedCourse = { id: 'B', title: 'New title' };
    const action = actions.updateCourseSuccess(editedCourse);

    // Do action
    const newState = courseReducer(initialState, action);

    const updatedCourse = newState.find(course => course.id === editedCourse.id);
    const untouchedCourse = newState.find(course => course.id === 'A');
    const notUpdatedCourses = newState.filter(course => course.id !== editedCourse.id);

    // Assert
    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toEqual('New title');
    expect(untouchedCourse.title).toEqual('A');
    expect(notUpdatedCourses.length).toEqual(2);
  });
});