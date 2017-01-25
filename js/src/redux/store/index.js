import { createStore, applyMiddleware, compose } from 'redux';

import reducers from '../reducers';

export default function configureStore(initialState) {
  
  const middleware = [];

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );
  

  return store;
}
