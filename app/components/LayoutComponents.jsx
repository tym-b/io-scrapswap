import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginDialog from 'components/LoginDialog';
import RegisterDialog from 'components/RegisterDialog';
import Snackbar from 'material-ui/Snackbar';

import { setSnackbarInfo } from 'actions/layout';

class LayoutComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleSnackbarClose() {
    this.props.dispatch(setSnackbarInfo());
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
      </div>
    );
  }
}

export default connect((state) => {
  return {
    layout: state.get('layout').toJS()
  };
})(LayoutComponents);
