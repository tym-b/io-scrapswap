import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/AppHeader';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import AccountIcon from 'material-ui/lib/svg-icons/action/account-circle';

const cx = classNames.bind(styles);

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderAccountInfo() {
    if (this.props.user.authenticated) {
      return (
        <Link to="/">
          <div className={cx('account-container')} onClick={this.props.onLogoutClick}>
            <span className={cx('account-name')}>Jan Kowalski</span>
            <IconButton className={cx('account-button')}>
              <AccountIcon />
            </IconButton>
          </div>
        </Link>
      );
    }

    return (
      <Link to="/login">
        <div className={cx('account-container')}>
          <IconButton className={cx('account-button')} tooltip="Logowanie">
            <AccountIcon />
          </IconButton>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <AppBar title={<Link to="/">ScrapSwap</Link>} showMenuIconButton={false} iconElementRight={this.renderAccountInfo()} />
    );
  }
}
