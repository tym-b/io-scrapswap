import React, { Component, PropTypes } from 'react';

import moment from 'moment';
import _ from 'lodash';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const mock = [
  {
    date: new Date(),
    sender: {
      _id: 'aaa',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'aaa',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'bbb',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  },
  {
    date: new Date(),
    sender: {
      _id: 'ccc',
      name: 'Paweł Husak'
    },
    body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
  }
];

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

  noMargin: {
    margin: '0px'
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
        <p key={key} style={styles.noMargin}>{message.body}</p>
      );
    });
  }

  render() {
    const letter = this.props.sender.name.split(/\s+/).map(i => i[0]).splice(0, 2).join('');
    const dateLabel = moment(this.props.messages[0].date).fromNow();

    return (
      <div style={styles.messageGroupContainer}>
        <div style={styles.senderContainer}>
          <Avatar size={30}>{letter}</Avatar>
          <div style={styles.senderNameContainer}>{this.props.sender.name}</div>
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
    return mock.reduce((prev, curr) => {
        if (prev) {
          const lastMessageGroup = _.last(prev);
          const lastMessage = _.last(lastMessageGroup.messages);

          if (lastMessageGroup.sender._id === curr.sender._id && moment(lastMessage.date).diff(curr.date, 'minutes') < 2) {
            lastMessageGroup.messages.push({
              date: curr.date,
              body: curr.body
            });
          } else {
            prev.push({
              sender: curr.sender,
              messages: [{
                date: curr.date,
                body: curr.body
              }]
            });
          }

          return prev;
        }

        return [{
          sender: curr.sender,
          messages: [{
            date: curr.date,
            body: 'aaa'
          }]
        }];
      }, false).map((group, key) => {
        return (<MessageGroup key={key} sender={group.sender} messages={group.messages} />);
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

export default Conversation;