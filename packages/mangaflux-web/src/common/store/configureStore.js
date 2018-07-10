import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-most";

import rootReducer from "../reducers";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(epicMiddleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
