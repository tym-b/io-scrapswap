import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import AdvertListContainer from 'containers/AdvertList';
import MessageListContainer from 'containers/MessageList';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    if (!store.getState().get('user').get('authenticated')) {
      replace({
        pathname: '/auth-needed',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={AdvertListContainer} />
      <Route path="messages" component={MessageListContainer} onEnter={requireAuth} />
    </Route>
  );
};
