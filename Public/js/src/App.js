import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

import auth from './redux/reducers/auth';

import MainPage from './scenes/MainPage';
import Login from './scenes/Login';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);


const history = syncHistoryWithStore(hashHistory, store);
export default class Navigator extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Login} />
          <Route path="main" component={MainPage} />
        </Router>
      </Provider>
    );
  }
}
