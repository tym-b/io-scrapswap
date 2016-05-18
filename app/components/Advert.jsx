import React, { Component, PropTypes } from 'react';

const styles = {

};

class Advert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data: advert } = this.props;

    return (
      <div>
        { advert.title }
      </div>
    );
  }
}

export default Advert;

Advert.propTypes = {
  data: PropTypes.object.isRequired
};
