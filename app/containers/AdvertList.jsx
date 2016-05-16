import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AdvertList from 'components/AdvertList';

import { fetchAdverts } from 'actions/adverts';

class AdvertListContainer extends Component {

  static need = [
    fetchAdverts
  ]

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdvertList adverts={this.props.adverts} />
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
