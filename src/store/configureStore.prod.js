import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
// Modul pro asynchronní načítání dat
import thunk from 'redux-thunk';

// Pro production
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

