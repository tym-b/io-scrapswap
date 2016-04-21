import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import AdvertListContainer from 'containers/AdvertList';
import LoginOrRegister from 'containers/LoginOrRegister';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={AdvertListContainer} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  );
};
