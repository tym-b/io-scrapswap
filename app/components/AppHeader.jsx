import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/AppHeader';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import { toggleLogin } from 'actions/layout';

const cx = classNames.bind(styles);

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderAccountInfo() {
    if (this.props.user.authenticated) {
      return (
        <Link to="/">
          <div className={cx('account-container')} onTouchTap={this.props.onLogoutClick}>
            <span className={cx('account-name')}>Jan Kowalski</span>
            <IconButton className={cx('account-button')}>
              <AccountIcon />
            </IconButton>
          </div>
        </Link>
      );
    }

    return (
      <div className={cx('account-container')} onTouchTap={this.props.onLoginClick}>
        <IconButton className={cx('account-button')} tooltip="Logowanie" tooltipPosition="bottom-left">
          <AccountIcon />
        </IconButton>
      </div>
    );
  }

  render() {
    return (
      <AppBar title={<Link to="/">ScrapSwap</Link>} iconElementRight={this.renderAccountInfo()} />
    );
  }
}
