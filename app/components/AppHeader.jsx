import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import CircularProgress from 'material-ui/CircularProgress';

import { toggleLogin } from 'actions/layout';

import UserMenuBlock from 'components/UserMenuBlock';

const styles = {
  progress: {
    color: '#fff'
  }
};

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.openLoginDialog = this.openLoginDialog.bind(this);
  }

  openLoginDialog() {
    this.props.dispatch(toggleLogin(true));
  }

  renderAccountInfo() {
    if (this.props.user.pending) {
      return (
        <CircularProgress size={0.4} color={styles.progress.color} />
      );
    }

    if (this.props.user.authenticated) {
      return (
        <UserMenuBlock />
      );
    }

    return (
      <IconButton tooltip="Logowanie" tooltipPosition="bottom-left" onTouchTap={this.openLoginDialog}>
        <AccountIcon />
      </IconButton>
    );
  }

  render() {
    return (
      <AppBar title={<Link to="/">ScrapSwap</Link>} iconElementRight={this.renderAccountInfo()} showMenuIconButton={false} />
    );
  }
}

export default connect((state) => {
  return {
    user: state.get('user').toJS()
  };
})(AppHeader);
