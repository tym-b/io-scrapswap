import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import MessageIcon from 'material-ui/svg-icons/communication/message';

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
        <Badge
          primary={ true }
          badgeContent={ this.props.numMessages }
          badgeStyle={badgeStyle}
          className="badge">
          <Link to="messages">
            <IconButton tooltip="Wiadomości" tooltipPosition="bottom-left">
              <MessageIcon color={ styles.accountIcon.color } />
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