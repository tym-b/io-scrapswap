import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { toggleLogin } from 'actions/layout';

import AppHeader from '../components/AppHeader';

const Navigation = ({user, dispatch}) => {
	let logout = () => dispatch(logOut());
	let openLoginDialog = () => dispatch(toggleLogin(true));

    return (
      <AppHeader user={user} onLogoutClick={logout} onLoginClick={openLoginDialog} />
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.get('user').toJS()
  };
}

export default connect(mapStateToProps)(Navigation);
