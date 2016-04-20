import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'api/promiseMiddleware';
import createLogger from 'redux-logger';

if (__DEVCLIENT__) {
  import devTools from 'remote-redux-devtools';
}

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  let middleware = [ thunk, promiseMiddleware ];
  // Installs hooks that always keep react-router and redux
  // store in sync
  const reactRouterReduxMiddleware = routerMiddleware(history);
  let finalCreateStore;

  if (__DEVCLIENT__) {
    middleware.push(reactRouterReduxMiddleware, createLogger());
    finalCreateStore = compose(applyMiddleware(...middleware), devTools())(createStore);
  } else {
    middleware.push(reactRouterReduxMiddleware);
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
