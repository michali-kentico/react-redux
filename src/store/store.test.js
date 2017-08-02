import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    // Příprava
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    // Vyvolání akcí na storu. Může být vyvoláno i několik různých akcí a testovat
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // Assert
    const actual = store.getState().courses[0];
    const expected = {
      title: "Clean Code"
    };
    expect(actual).toEqual(expected);
  });
});