import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// Redux
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';

// Importování stylů
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
// Prvotní načtení kurzů z API
store.dispatch(loadCourses());
// Prvotní načtení autorů z API
store.dispatch(loadAuthors());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);