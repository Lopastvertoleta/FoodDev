// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import configureStore from './redux/store';
// import Navigator from './navigation/Navigator';

// const store = configureStore();

// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Navigator />
//       </Provider>
//     );
//   }
// }
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

import MainPage from './scenes/MainPage';
import Login from './scenes/Login';

const rootReducer = combineReducers({
  routing: routerReducer
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
