import { createStore, applyMiddleware } from 'redux';
import { run } from '@cycle/run';
import { createCycleMiddleware } from 'redux-cycles';
import { makeHTTPDriver } from '@cycle/http';

import rootReducer from '../reducers';
import rootCycle from '../cycle';

const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver } = cycleMiddleware;

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(cycleMiddleware),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

run(rootCycle, {
  ACTION: makeActionDriver(),
  HTTP: makeHTTPDriver(),
});

export default configureStore;
