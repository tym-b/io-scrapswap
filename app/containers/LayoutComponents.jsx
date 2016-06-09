import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginDialog from 'components/LoginDialog';
import RegisterDialog from 'components/RegisterDialog';

import AdvertIcon from 'material-ui/svg-icons/action/picture-in-picture';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { setSnackbarInfo, toggleMenu } from 'actions/layout';

const styles = {
  appTitle: {
    fontSize: '24px',
    fontWeight: '400',
    lineHeight: '64px',
    height: '64px',
    padding: '0px',
    margin: '0px',
    textAlign: 'center'
  }
};

class LayoutComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleMenuState = this.handleMenuState.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleSnackbarClose() {
    this.props.dispatch(setSnackbarInfo());
  }

  handleMenuState(open) {
    this.props.dispatch(toggleMenu(open));
  }

  handleLocationChange(location = '/') {
    this.props.dispatch(push(location));
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
        <Drawer docked={false} open={this.props.layout.menuOpen} onRequestChange={this.handleMenuState}>
          <h1 style={styles.appTitle}>ScrapSwap</h1>
          <MenuItem onTouchTap={this.handleLocationChange} rightIcon={<AdvertIcon />}>Ogłoszenia</MenuItem>
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
