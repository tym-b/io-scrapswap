import React, { Component, PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

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

  accountIcon: {
    display: 'flex'
  }
};

export default class UserMenuBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.accountContainer}>
        <span style={styles.accountName}>{this.props.profile.name}</span>
        <IconButton style={styles.accountIcon}>
          <AccountIcon />
        </IconButton>
      </div>
    );
  }
}

UserMenuBlock.propTypes = {
  profile: PropTypes.object.isRequired
};
