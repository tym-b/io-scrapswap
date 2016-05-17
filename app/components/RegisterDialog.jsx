import React, { Component, PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { signUp } from 'actions/users';
import { switchLogin, toggleRegister } from 'actions/layout';

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
  } else if (values.get('password').length < 7) {
    errors.password = 'Hasło musi zawierać co najmniej 7 znaków';
  }

  return errors;
};

class RegisterDialog extends Component {
  constructor(props) {
    super(props);
    this.closeRegisterDialog = this.closeRegisterDialog.bind(this);
    this.tryRegister = this.tryRegister.bind(this);
    this.openLogin = this.openLogin.bind(this);
  }

  tryRegister(values) {
    this.props.dispatch(signUp({
      email: values.get('email'),
      password: values.get('password')
    }));
  }

  closeRegisterDialog() {
    const { reset } = this.props;
    
    reset();
    this.props.dispatch(toggleRegister(false));
  }

  openLogin() {
    const { reset } = this.props;

    reset();
    this.props.dispatch(switchLogin());
  }

  render() {
    const { handleSubmit } = this.props;

    const actions = [
      <FlatButton
        label="Zamknij"
        onTouchTap={this.closeRegisterDialog} />,

      <FlatButton
        label="Wyślij"
        primary={true}
        onTouchTap={handleSubmit(this.tryRegister)} />
    ];

    return (
      <Dialog
        title="Rejestracja"
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={styles.dialog}
        onRequestClose={this.closeRegisterDialog}>
        <p>Załóż konto, aby w pełni korzystać ze ScrapSwap.</p>
        <p>Masz już konto? <a style={styles.a} onClick={this.openLogin}>Zaloguj się</a></p>
        <form style={styles.form} name="RegisterForm" onSubmit={handleSubmit(this.tryRegister)}>
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
  form: 'registration',
  validate
})(RegisterDialog);

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
