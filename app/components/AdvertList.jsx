import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class AdvertList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>aaa</li>
      </ul>
    );
  }
}

AdvertList.propTypes = {
  adverts: PropTypes.array.isRequired
};
