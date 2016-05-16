import React, { Component, PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { login } from 'actions/users';

const styles = {
  dialog: {
    width: '300px'
  }
};

const validate = values => {
  const errors = {
    email: 'hehee'
  };
  return errors;
}

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
  }

  tryLogin() {
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
    this.props.dispatch(login);
  }

  closeLoginDialog() {
    this.props.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Zamknij"
        primary={true}
        onTouchTap={this.closeLoginDialog} />,

      <FlatButton
        label="Zaloguj"
        primary={true}
        onTouchTap={this.tryLogin} />
    ];

    const { handleSubmit } = this.props;

    return (
      <Dialog
        title="Logowanie"
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={styles.dialog}
        onRequestClose={this.closeLoginDialog}>
        <p>Zaloguj się na ScrapSwap. Wpisz swoje dane poniżej.</p>
        <form name="loginForm" onSubmit={handleSubmit}>
          <Field name="email"
            type="email"
            component={email =>
              <TextField
                hintText="jan@kowalski.pl"
                floatingLabelText="Email"
                errorText={email.touched && email.error}
                {...email} />
            } /><br/>
          <Field name="password"
            type="password"
            component={password =>
              <TextField
                type="password"
                floatingLabelText="Hasło"
                errorText={password.touched && password.error}
                {...password} />
            } />
        </form>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginDialog);

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func
};
