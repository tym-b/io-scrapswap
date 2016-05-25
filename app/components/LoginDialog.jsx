import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { login } from 'actions/users';
import { toggleLogin, switchRegister, setSnackbarInfo } from 'actions/layout';

const styles = {
  dialog: {
    width: '100%',
    maxWidth: '400px'
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
    const { reset } = this.props;

    let promise = this.props.dispatch(login({
      email: values.get('email'),
      password: values.get('password')
    }));

    promise.then(() => {
      reset();
      this.props.dispatch(setSnackbarInfo('Pomyślnie zalogowano'));
      this.props.dispatch(toggleLogin(false));
    });

    return promise;
  }

  closeLoginDialog() {
    const { reset, user: { pending } } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(toggleLogin(false));
    }
  }

  openRegistration() {
    const { reset, user: { pending } } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(switchRegister());
    }
  }

  render() {
    const { handleSubmit } = this.props;

    const actions = [
      <FlatButton
        label="Zamknij"
        disabled={this.props.user.pending}
        onTouchTap={this.closeLoginDialog} />,

      <FlatButton
        label="Zaloguj"
        primary={true}
        disabled={this.props.user.pending}
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
                disabled={this.props.user.pending}
                hintText="jan@kowalski.pl"
                floatingLabelText="Email"
                errorText={email.touched && email.error}
                {...email} />
            } />
          <Field name="password"
            type="password"
            component={password =>
              <TextField
                type="password"
                disabled={this.props.user.pending}
                floatingLabelText="Hasło"
                errorText={password.touched && password.error}
                {...password} />
            } />
          <input disabled={this.props.user.pending} type="submit" style={styles.submitButton} />
        </form>
      </Dialog>
    );
  }
}

const formData = {
  form: 'login',
  validate
};

const mapStateToProps = (state) => {
  return {
    user: state.get('user').toJS()
  };
};

export default connect(mapStateToProps)(reduxForm(formData)(LoginDialog));

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
