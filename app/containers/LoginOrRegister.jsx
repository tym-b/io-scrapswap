import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';

import LoginDialog from 'components/LoginDialog';
import RegisterDialog from 'components/RegisterDialog';

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  toggleMode() {
    this.props.dispatch(toggleLoginMode());
  }

  onLoginSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
  }

  onRegisterSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(signUp({
      email: email,
      password: password
    }));
  }

  renderHeader() {
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div>
          <h1>Login with Email</h1>
          <div>
            Not what you want?
            <a
              onClick={this.toggleMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div>
      <h1>Register with Email</h1>
        <div>
          Already have an account?
          <a onClick={this.toggleMode}> Login</a>
        </div>
      </div>
    );
  }

  renderButton() {
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <button onClick={this.onLoginSubmit}>Login</button>
      );
    }

    return (
      <button onClick={this.onRegisterSubmit}>Register</button>
    );
  }

  render() {
    const { isWaiting, message } = this.props.user;

    return (
      <div>
        <LoginDialog open={this.props.layout.loginOpen} />
        <RegisterDialog open={this.props.layout.registerOpen} />
        <div>
          { this.renderHeader() }
          <div>
            <input type="email"
              ref="email"
              placeholder="email" />
            <input type="password"
              ref="password"
              placeholder="password" />
            <div>
              <div>Hint</div>
              <div>email: example@ninja.com password: ninja</div>
            </div>
            <p>{message}</p>
            { this.renderButton() }
          </div>
          <div>
            <h1>Google Login Demo</h1>
            <a href="/auth/google">Login with Google</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  layout: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect((state) => {
  return {
    user: state.get('user').toJS(),
    layout: state.get('layout').toJS()
  };
})(LoginOrRegister);

