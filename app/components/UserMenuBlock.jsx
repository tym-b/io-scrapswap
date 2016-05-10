import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/UserMenuBlock';

import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

const cx = classNames.bind(styles);

export default class UserMenuBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx('account-container')}>
        <span className={cx('account-name')}>{this.props.user.name}</span>
        <IconButton className={cx('account-button')}>
          <AccountIcon />
        </IconButton>
      </div>
    );
  }
}

UserMenuBlock.propTypes = {
  user: PropTypes.object.isRequired
};
