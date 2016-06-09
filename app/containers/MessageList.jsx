import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form/immutable';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import {green400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Conversation from 'components/Conversation';

const styles = {
  mainContainer: {
    width: 'calc(100% - 60px)',
    maxWidth: '1200px',
    margin: '0px auto',
    padding: '30px 0px',
    display: 'flex',
    alignItems: 'flex-start'
  },

  floatingButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px'
  },

  navigationContainer: {
    width: '350px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
  },

  messagingContainer: {
    display: 'flex',
    flexGrow: '1',
    marginLeft: '30px',
    height: 'calc(100vh - 195px)',
    flexDirection: 'column'
  },

  formContainer: {
    height: '60px',
    display: 'flex',
    alignItems: 'center'
  },

  inputContainer: {
    display: 'flex',
    flexGrow: '1'
  },

  submitContainer: {
    marginLeft: '30px'
  },

  conversationContainer: {
    display: 'flex',
    flexGrow: '1'
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
            leftAvatar={<Avatar backgroundColor={green400}>{letter}</Avatar>}
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
        <div style={styles.messagingContainer} className="messages__message-container">
          <div style={styles.conversationContainer}>
            <Conversation />
          </div>
          <form name="conversation" style={styles.formContainer}>
            <div style={styles.inputContainer}>
              <Field name="body"
                type="text"
                component={body =>
                  <TextField
                    fullWidth={true}
                    disabled={this.props.pending}
                    hintText="Tu wpisz wiadomość"
                    errorText={body.touched && body.error}
                    {...body} />
                } />
            </div>
            <div style={styles.submitContainer}>
              <RaisedButton label="Wyślij" primary={true} />
            </div>
          </form>
        </div>
        <FloatingActionButton
          style={ styles.floatingButton }>
          <MessageIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

MessageListContainer.propTypes = {
};

const formData = {
  form: 'conversation'
};

export default connect((state) => {
  return {};
})(reduxForm(formData)(MessageListContainer));
