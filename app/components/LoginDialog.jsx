import React, { Component, PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { login } from 'actions/users';
import { toggleLogin, switchRegister } from 'actions/layout';

const styles = {
  dialog: {
    width: '400px'
  },

  submitButton: {
    display: 'none'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  a: {
    color: '#5eb45e',
    fontWeight: 'bold'
  }
};

const validate = (values) => {
  let errors = {};

  if (!values.get('email')) {
    errors.email = 'Adres email jest wymagany';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'To nie jest poprawny adres email';
  }

  if (!values.get('password')) {
    errors.password = 'Hasło jest wymagane';
  }

  return errors;
};

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
    this.openRegistration = this.openRegistration.bind(this);
  }

  tryLogin(values) {
    this.props.dispatch(login({
      email: values.get('email'),
      password: values.get('password')
    }));
  }

  closeLoginDialog() {
    const { reset } = this.props;
    reset();
    this.props.dispatch(toggleLogin(false));
  }

  openRegistration() {
    this.props.dispatch(switchRegister());
  }

  render() {
    const { handleSubmit } = this.props;

    const actions = [
      <FlatButton
        label="Zamknij"
        onTouchTap={this.closeLoginDialog} />,

      <FlatButton
        label="Zaloguj"
        primary={true}
        onTouchTap={handleSubmit(this.tryLogin)} />
    ];

    return (
      <Dialog
        title="Logowanie"
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={styles.dialog}
        onRequestClose={this.closeLoginDialog}>
        <p>Zaloguj się na ScrapSwap. Wpisz swoje dane poniżej.</p>
        <p>Nie masz jeszcze konta? <a style={styles.a} onClick={this.openRegistration}>Zarejestruj się</a></p>
        <form style={styles.form} name="loginForm" onSubmit={handleSubmit(this.tryLogin)}>
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
          <input type="submit" style={styles.submitButton} />
        </form>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate
})(LoginDialog);

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
