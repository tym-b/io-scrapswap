import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import AppHeader from '../components/AppHeader'

const Navigation = ({user, dispatch}) => {
	let logout = () => dispatch(logOut());

    return (
      <AppHeader user={user} onLogoutClick={logout} />
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
