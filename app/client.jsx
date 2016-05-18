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

import moment from 'moment';

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS();
  }
});
const routes = createRoutes(store);

injectTapEventPlugin();
moment.locale('pl');

const muiTheme = scrapswapMuiThemeProvider(window.navigator.userAgent);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>, document.getElementById('app'));
