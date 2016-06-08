import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

const styles = {
  mainContainer: {
    width: 'calc(100% - 60px)',
    maxWidth: '1200px',
    margin: '0px auto',
    padding: '30px 0px'
  },

  floatingButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px'
  },

  navigationContainer: {
    position: 'aboslute',
    bottom: '0px',
    left: '0px',
    width: '350px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
  },

  messageContainer: {
    paddingRight: '300px'
  }
};

class MessageListContainer extends Component {

  static need = [];

  constructor(props) {
    super(props);
    this.renderConversationsList = this.renderConversationsList.bind(this);
  }

  renderConversationsList() {
    const conversations = [
      {
        user: 'Paweł Husak',
        text: 'Lorem ipsum lorem'
      },
      {
        user: 'Magda Łątkowska',
        text: 'Lorem ipsum lorem'
      },
      {
        user: 'Michał Kaźmierczak',
        text: 'Lorem ipsum lorem'
      },
      {
        user: 'Tymon',
        text: 'Lorem ipsum lorem'
      }
    ];

    return conversations.map((conversation, key) => {
      const dividerStyle = {};

      if (key === conversations.length - 1) {
        dividerStyle.display = 'none';
      }

      const letter = conversation.user.split(/\s+/).map(i => i[0]).splice(0, 2).join('');

      return (
        <div key={key}>
          <ListItem
            leftAvatar={<Avatar>{letter}</Avatar>}
            primaryText={conversation.user}
            secondaryText={conversation.text}
            secondaryTextLines={1} />
          <Divider inset={true} style={dividerStyle} />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <div style={styles.navigationContainer} className="messages__navigation-container">
          <List>
            <Subheader>Twoje konwersacje</Subheader>
            { this.renderConversationsList() }
          </List>
        </div>
        <div style={styles.messageContainer} className="messages__message-container">

        </div>
        <FloatingActionButton
          style={ styles.floatingButton }>
          <ContentAddIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

MessageListContainer.propTypes = {
};

export default connect((state) => {
  return {};
})(MessageListContainer);
