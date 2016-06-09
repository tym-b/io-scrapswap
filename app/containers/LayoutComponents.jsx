import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginDialog from 'components/LoginDialog';
import RegisterDialog from 'components/RegisterDialog';

import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { setSnackbarInfo, toggleMenu } from 'actions/layout';

class LayoutComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleMenuState = this.handleMenuState.bind(this);
  }

  handleSnackbarClose() {
    this.props.dispatch(setSnackbarInfo());
  }

  handleMenuState(open) {
    this.props.dispatch(toggleMenu(open));
  }

  render() {
    const { snackbarInfo } = this.props.layout;

    return (
      <div>
        <Snackbar
          open={(snackbarInfo !== '')}
          message={snackbarInfo}
          onRequestClose={this.handleSnackbarClose}
          autoHideDuration={4000} />
        <LoginDialog open={this.props.layout.loginOpen} />
        <RegisterDialog open={this.props.layout.registerOpen} />
        <Drawer open={this.props.layout.menuOpen} onRequestChange={this.handleMenuState}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    layout: state.get('layout').toJS()
  };
})(LayoutComponents);
