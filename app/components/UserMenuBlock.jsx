import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import { logout } from 'actions/users';

const styles = {
  accountContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  accountName: {
    color: '#fff',
    fontSize: '16px',
    display: 'flex'
  },

  accountIconButton: {
    display: 'flex'
  },

  accountIcon: {
    color: '#fff'
  }
};

class UserMenuBlock extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(ev, item) {
    if (item.props.value === 'logout') {
      this.props.dispatch(logout());
    }
  }

  render() {
    return (
      <div style={styles.accountContainer}>
        <span style={styles.accountName}>{this.props.user.profile.name}</span>
        <IconMenu
          onItemTouchTap={this.handleMenuClick}
          iconButtonElement={<IconButton style={styles.accountIconButton}><AccountIcon color={styles.accountIcon.color} /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem
            value="logout"
            primaryText="Wyloguj" />
        </IconMenu>
      </div>
    );
  }
}

export default connect(state => {
  return {
    user: state.get('user').toJS()
  };
})(UserMenuBlock);