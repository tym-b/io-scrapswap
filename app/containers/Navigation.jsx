import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import SwapIcon from 'material-ui/lib/svg-icons/action/cached';

const cx = classNames.bind(styles);

const Navigation = ({user, dispatch}) => {
    return (
      <AppBar title="ScrapSwap" iconElementLeft={<IconButton><SwapIcon /></IconButton>} />
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
