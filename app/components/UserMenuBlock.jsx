import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import {green500} from 'material-ui/styles/colors';

const styles = {
  accountContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%'
  },

  accountName: {
    color: '#fff',
    fontSize: '16px',
    display: 'flex'
  },

  accountIconButton: {
    display: 'flex'
  },

  avatar: {
    marginLeft: '20px',
    marginRight: '8px'
  },

  messageIcon: {
    color: '#fff'
  },

  avatarColors: {
    backgroundColor: '#fff',
    color: green500
  }
};

class UserMenuBlock extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(ev, item) {
    if (item.props.value === 'logout') {
      this.props.onLogout();
    }
  }

  render() {
    let badgeStyle = {};
    if (this.props.numMessages === 0) {
      badgeStyle = {
        display: 'none'
      };
    }

    const letter = this.props.user.profile.name.split(/\s+/).map(i => i[0]).splice(0, 2).join('');

    return (
      <div style={styles.accountContainer}>
        <IconMenu
          onItemTouchTap={this.handleMenuClick}
          iconButtonElement={
            <div style={styles.avatarContainer}>
              <span style={styles.accountName}>{this.props.user.profile.name}</span>
              <Avatar color={styles.avatarColors.color} backgroundColor={styles.avatarColors.backgroundColor} size={28} style={styles.avatar}>{letter}</Avatar>
            </div>
          }
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem
            value="logout"
            primaryText="Wyloguj" />
        </IconMenu>
        <Badge
          primary={ true }
          badgeContent={ this.props.numMessages }
          badgeStyle={badgeStyle}
          className="badge">
          <Link to="messages">
            <IconButton tooltip="Wiadomości" tooltipPosition="bottom-left">
              <MessageIcon color={ styles.messageIcon.color } />
            </IconButton>
          </Link>
        </Badge>
      </div>
    );
  }
}

UserMenuBlock.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  numMessages: PropTypes.number.isRequired
};

export default UserMenuBlock;