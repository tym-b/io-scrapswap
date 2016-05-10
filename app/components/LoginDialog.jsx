import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
  }

  closeLoginDialog() {
    this.props.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Zaloguj"
        primary={true}
        onTouchTap={this.closeLoginDialog} />
    ];

    return (
      <Dialog
        title="Logowanie"
        modal={false}
        actions={actions}
        open={this.props.open}
        onRequestClose={this.closeLoginDialog}>
        aaaa
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func
};
