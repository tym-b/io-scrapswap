import React from 'react';
import Immutable from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import scrapswapMuiThemeProvider from './scrapswapMuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fetchComponentDataBeforeRender} from 'api/fetchComponentDataBeforeRender';
import startConversations from 'middlewares/conversationMiddleware';

import moment from 'moment';
moment.locale('pl');

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);

/* https://github.com/reactjs/react-router-redux/issues/314 */
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('routing');

    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState()
});
const routes = createRoutes(store);

injectTapEventPlugin();
startConversations(store);

function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;

  fetchComponentDataBeforeRender(store.dispatch, components, params);
}

const muiTheme = scrapswapMuiThemeProvider(false);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history} onUpdate={onUpdate}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>, document.getElementById('app'));
