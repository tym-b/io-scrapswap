import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AdvertList from 'components/AdvertList';

class AdvertListContainer extends Component {
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
    adverts: state.advert.adverts
  };
}

export default connect(mapStateToProps)(AdvertListContainer);
