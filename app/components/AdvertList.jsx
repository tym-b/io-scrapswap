import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class AdvertList extends Component {
  constructor(props) {
    super(props);
    this.renderAdvertList = this.renderAdvertList.bind(this);
  }

  renderAdvertList() {
    return this.props.adverts.map((advert, key) => {
      return (<li key={key}>{advert.title}</li>);
    });
  }

  render() {
    return (
      <ul>
        {this.renderAdvertList()}
      </ul>
    );
  }
}

AdvertList.propTypes = {
  adverts: PropTypes.array.isRequired
};
