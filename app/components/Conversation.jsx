import React, { Component, PropTypes } from 'react';

import moment from 'moment';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const styles = {
  mainContainer: {
    overflowY: 'auto'
  },

  messageContainer: {

  }
};

class Conversation extends Component {

  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    const mock = [
      {
        date: new Date(),
        sender: {
          name: 'Paweł Husak'
        },
        body: 'Lorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum'
      }
    ];

    return mock.reduce((prev, curr) => {
        if (prev) {

        }

        return {
          sender: curr.sender,
          date: curr.date,
          messages: [curr.body]
        };
      })
      .map((message, key) => {
        return (
          <div key={key} style={styles.messageContainer}>

          </div>
        );
      });
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        {this.renderMessages()}
      </div>
    );
  }

}

export default Conversation;