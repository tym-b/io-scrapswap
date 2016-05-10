import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import { toggleLogin } from 'actions/layout';
import UserMenuBlock from 'components/UserMenuBlock'

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderAccountInfo() {
    if (this.props.user.authenticated) {
      return (
        <UserMenuBlock user={this.props.user} />
      );
    }

    return (
      <IconButton tooltip="Logowanie" tooltipPosition="bottom-left" onTouchTap={this.props.onLoginClick}>
        <AccountIcon />
      </IconButton>
    );
  }

  render() {
    return (
      <AppBar title={<Link to="/">ScrapSwap</Link>} iconElementRight={this.renderAccountInfo()} />
    );
  }
}

UserMenuBlock.propTypes = {
  user: PropTypes.object
};
