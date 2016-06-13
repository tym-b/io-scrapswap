import React, { Component, PropTypes } from 'react';

import moment from 'moment';
import _ from 'lodash';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const styles = {
  mainContainer: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1'
  },

  messageGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    flexGrow: '1',
    flexShrink: '0',
    marginRight: '5px'
  },

  dateContainer: {
    fontSize: '12px',
    color: '#555',
    lineHeight: '30px',
    textAlign: 'right'
  },

  spacerContainer: {
    display: 'flex',
    flexGrow: '1'
  },

  senderContainer: {
    display: 'flex'
  },

  senderNameContainer: {
    lineHeight: '30px',
    fontSize: '16px',
    marginLeft: '10px',
    fontWeight: '500'
  },

  contentContainer: {
    paddingLeft: '40px',
    fontSize: '14px'
  },

  textParagraph: {
    margin: '0px',
    whiteSpace: 'pre-wrap'
  }
};

class MessageGroup extends Component {

  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    return this.props.messages.map((message, key) => {
      return (
        <p key={key} style={styles.textParagraph}>{message.text}</p>
      );
    });
  }

  render() {
    const letter = this.props.senderName.split(/\s+/).map(i => i[0]).splice(0, 2).join('');
    const dateLabel = moment(this.props.messages[0].date).fromNow();

    return (
      <div style={styles.messageGroupContainer}>
        <div style={styles.senderContainer}>
          <Avatar size={30}>{letter}</Avatar>
          <div style={styles.senderNameContainer}>{this.props.senderName}</div>
          <div style={styles.spacerContainer}></div>
          <div style={styles.dateContainer}>{dateLabel}</div>
        </div>
        <div style={styles.contentContainer}>
          {this.renderMessages()}
        </div>
      </div>
    );
  }

}

class Conversation extends Component {

  constructor(props) {
    super(props);
  }

  renderMessageGroups() {
    const { members, messages } = this.props.data;

    return messages.reduce((prev, curr) => {
        if (prev) {
          const lastMessageGroup = _.last(prev);
          const lastMessage = _.last(lastMessageGroup.messages);

          if (lastMessageGroup.sender === curr.sender && moment(lastMessage.date).diff(curr.date, 'minutes') < 2) {
            lastMessageGroup.messages.push({
              date: curr.date,
              text: curr.text
            });
          } else {
            prev.push({
              sender: curr.sender,
              messages: [{
                date: curr.date,
                text: curr.text
              }]
            });
          }

          return prev;
        }

        return [{
          sender: curr.sender,
          messages: [{
            date: curr.date,
            text: curr.text
          }]
        }];

      }, false).map((group, key) => {
        debugger;
        const senderName = _.find(members, m => m._id === group.sender).profile.name;
        return (<MessageGroup key={key} senderName={senderName} messages={group.messages} />);
      });
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <ReactCSSTransitionGroup transitionName="list-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {this.renderMessageGroups()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

Conversation.propTypes = {
  data: PropTypes.object.isRequired
};

export default Conversation;