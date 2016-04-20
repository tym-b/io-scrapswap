import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import AccountIcon from 'material-ui/lib/svg-icons/action/account-circle';

const cx = classNames.bind(styles);

const Navigation = ({user, dispatch}) => {
    return (
      <AppBar title="ScrapSwap" showMenuIconButton={false} iconElementRight={<IconButton to="/login"><AccountIcon /></IconButton>} />
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
