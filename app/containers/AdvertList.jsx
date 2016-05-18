import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';

import Advert from 'components/Advert';

import { fetchAdverts } from 'actions/adverts';

class AdvertListContainer extends Component {

  static need = [
    fetchAdverts
  ]

  constructor(props) {
    super(props);
    this.renderAdvertList = this.renderAdvertList.bind(this);
  }

  renderAdvertList() {
    return this.props.adverts.map((advert, key) => {
      return (<Advert key={key} data={advert} />);
    });
  }

  render() {
    return (
      <ReactCSSTransitionGroup>
        { this.renderAdvertList() }
      </ReactCSSTransitionGroup>
    );
  }
}

AdvertListContainer.propTypes = {
  adverts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    adverts: state.get('advert').get('adverts').toJS()
  };
}

export default connect(mapStateToProps)(AdvertListContainer);
