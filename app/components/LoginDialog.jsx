import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';

export default class LoginDialog extends Component {
  constructor(props) {
    super(props);
  }

  closeLoginDialog() {
    
  }

  render() {
    return (
      <Dialog
        title="Logowanie"
        modal={false}
        open={this.props.open}
        onRequestClose={() => console.log('aaa')}>
          Bla bla bla
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func
};
