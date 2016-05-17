import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import AdvertListContainer from 'containers/AdvertList';

export default (store) => {
  // NEEDS TO BE REWRITTEN

  // const requireAuth = (nextState, replace, callback) => {
  //   const { user: { authenticated }} = store.getState();
  //   if (!authenticated) {
  //     replace({
  //       pathname: '/login',
  //       state: { nextPathname: nextState.location.pathname }
  //     });
  //   }
  //   callback();
  // };

  // const redirectAuth = (nextState, replace, callback) => {
  //   const { user: { authenticated }} = store.getState();
  //   if (authenticated) {
  //     replace({
  //       pathname: '/'
  //     });
  //   }
  //   callback();
  // };

  // <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />

  return (
    <Route path="/" component={App}>
      <IndexRoute component={AdvertListContainer} />
    </Route>
  );
};
