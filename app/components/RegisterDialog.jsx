import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { register } from 'actions/users';
import { toggleRegister, switchLogin, setSnackbarInfo } from 'actions/layout';

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

  if (!values.get('name')) {
    errors.name = 'Nazwa użytkownika jest wymagana'
  } else if (values.get('name').length < 5) {
    errors.name = 'Nazwa musi posiadać co najmniej 5 znaków';
  }

  if (!values.get('password')) {
    errors.password = 'Hasło jest wymagane';
  } else if (values.get('password').length < 7) {
    errors.password = 'Hasło musi posiadać co najmniej 7 znaków';
  }

  if (!values.get('passwordRepeat')) {
    errors.passwordRepeat = 'Wypełnij to pole';
  } else if (values.get('password') !== values.get('passwordRepeat')) {
    errors.passwordRepeat = 'Hasła muszą być identyczne';
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
    const { reset } = this.props;

    let promise = this.props.dispatch(register({
      email: values.get('email'),
      profile: {
        name: values.get('name')
      },
      password: values.get('password')
    }));

    promise.then(() => {
      reset();
      this.props.dispatch(setSnackbarInfo('Zalogowano na nowe konto'));
      this.props.dispatch(toggleRegister(false));
    });

    return promise;
  }

  closeRegisterDialog() {
    const { reset, user: { pending } } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(toggleRegister(false));
    }
  }

  openLogin() {
    const { reset, user: { pending } } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(switchLogin());
    }
  }

  render() {
    const { handleSubmit } = this.props;

    const actions = [
      <FlatButton
        label="Zamknij"
        disabled={this.props.user.pending}
        onTouchTap={this.closeRegisterDialog} />,

      <FlatButton
        label="Wyślij"
        primary={true}
        disabled={this.props.user.pending}
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
        <p>Zarejestruj się na ScrapSwap. Wpisz swoje dane poniżej.</p>
        <p>Masz już konto? <a style={styles.a} onClick={this.openLogin}>Zaloguj się</a></p>
        <form style={styles.form} name="registerForm" onSubmit={handleSubmit(this.tryRegister)}>
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
          <Field name="name"
            type="text"
            component={name =>
              <TextField
                disabled={this.props.user.pending}
                hintText="Jan Kowalski"
                floatingLabelText="Nazwa użytkownika"
                errorText={name.touched && name.error}
                {...name} />
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
          <Field name="passwordRepeat"
            type="password"
            component={passwordRepeat =>
              <TextField
                type="passwordRepeat"
                disabled={this.props.user.pending}
                floatingLabelText="Powtórz hasło"
                errorText={passwordRepeat.touched && passwordRepeat.error}
                {...passwordRepeat} />
            } />
          <input disabled={this.props.user.pending} type="submit" style={styles.submitButton} />
        </form>
      </Dialog>
    );
  }
}

const formData = {
  form: 'register',
  validate
};

const mapStateToProps = (state) => {
  return {
    user: state.get('user').toJS()
  };
};

export default connect(mapStateToProps)(reduxForm(formData)(RegisterDialog));

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
