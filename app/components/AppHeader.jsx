import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import AccountIcon from 'material-ui/lib/svg-icons/action/account-circle';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar title={<Link to="/">ScrapSwap</Link>} showMenuIconButton={false} iconElementRight={<Link to="/login"><IconButton><AccountIcon /></IconButton></Link>} />
    );
  }
}

AppHeader.propTypes = {
};
