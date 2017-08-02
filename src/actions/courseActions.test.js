// Importy pro testování Action Creators
import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

// Importy pro testování Thunk
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Testování Action Creators
describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      // Příprava vstupních dat a očekávané výstupní akce
      const course = { id: 'test-course-id', title: 'Test course'};
      const expectedAction = { type: types.CREATE_COURSE_SUCCESS, course: course };

      // Zavolání creatoru
      const action = courseActions.createCourseSuccess(course);

      // Porovnání, zda akce vytvořená creatorem odpovídá očekávané akci
      expect(action).toEqual(expectedAction);
    });
  });
});




// Testování Thunk
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  // Kód, který se vykoná po každém testu v této kategorii
  afterEach(() => {
    nock.cleanAll();
  });

  // Definice callbacku (done), který používá Mocha pro určení, zda všechny asynchronní operace jsou dokončené
  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    // Příklad mockovaného HTTP volání (v tomto případě není potřeba, protože používáme mockované API)
    // nock('http://example.com/')
    //   .get('/courses')
    //   .reply(200, { body: { course: [{ id: 1, firstName: 'Test', lastName: 'Test' }] } });

    // Očekávané akce (u druhé včetně očekávané odpovědi), které se mají vyvolat v testu.
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_COURSES_SUCCESS, body: { course: [{ id: 'clean-code', title: 'Clean Code' }] } }
    ];

    // Mockování storu s iniciálním stavem
    const store = mockStore({ course: [] }, expectedActions);

    // Dispatchování načtení kurzů, po dokončení načítání se zkontroluje, zda byly na storu zavolány očekávané akce
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      // Callback done() říká Mocha, že asynchronní operace jsou kompletně dokončené.
      done();
    });
  });
});