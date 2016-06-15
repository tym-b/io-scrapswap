import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import expect from 'expect';
import AppHeader from 'containers/AppHeader';
import UserMenuBlock from 'components/UserMenuBlock';
import _ from 'lodash';

import scrapswapMuiThemeProvider from '../../scrapswapMuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Immutable from 'immutable';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('AppHeader Component', () => {
  const muiTheme = scrapswapMuiThemeProvider(false);

  it('should render UserMenuBlock when user is logged in', () => {
    const store = mockStore(Immutable.fromJS({
      user: {
        authenticated: true,
        profile: {
          name: 'Jan Kowalski'
        }
      }
    }));

    let result = ReactTestUtils.renderIntoDocument(
      <Provider store={ store }>
        <MuiThemeProvider muiTheme={ muiTheme }>
          <AppHeader />
        </MuiThemeProvider>
      </Provider>
    );

    ReactTestUtils.findRenderedComponentWithType(result, UserMenuBlock)
  });
});
