import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
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
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(LoginOrRegister);

