import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { wrap } from 'react-stateless-wrapper';
import AppHeader from 'components/AppHeader';
import AppBar from 'material-ui/AppBar';
import _ from 'lodash';

import scrapswapMuiThemeProvider from '../../scrapswapMuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('AppHeader', () => {
  const muiTheme = scrapswapMuiThemeProvider(false);

  let result;

  describe('When user is logged in', () => {
    let mockUser = {
      authenticated: true
    };

    result = ReactTestUtils.renderIntoDocument(
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppHeader user={mockUser} onLogoutClick={_.noop} onLoginClick={_.noop} />
      </MuiThemeProvider>
    );

    it('should render AppBar component', () => {
      ReactTestUtils.findRenderedComponentWithType(result, AppBar);
    });
  });
});
