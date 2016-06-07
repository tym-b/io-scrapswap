import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const styles = {};

class MessageListContainer extends Component {

  static need = []

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        messages
      </div>
    );
  }
}

MessageListContainer.propTypes = {
};

export default connect((state) => {
  return {};
})(MessageListContainer);
