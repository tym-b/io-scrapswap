import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

import Advert from 'components/Advert';
import AdvertDialog from 'components/AdvertDialog';

import { fetchAdverts, toggleDialog } from 'actions/adverts';
import { fetchCategories } from 'actions/categories';

const styles = {
  container: {
    width: '800px',
    margin: '50px auto'
  },

  floatingButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px'
  }
};

class AdvertListContainer extends Component {

  static need = [
    fetchAdverts,
    fetchCategories
  ]

  constructor(props) {
    super(props);
    this.renderAdvertList = this.renderAdvertList.bind(this);
    this.openAdvertDialog = this.openAdvertDialog.bind(this);
  }

  renderAdvertList() {
    return this.props.adverts.map((advert, key) => {
      return (<Advert key={key} data={advert} />);
    });
  }

  openAdvertDialog() {
    this.props.dispatch(toggleDialog(true));
  }

  render() {
    return (
      <div style={ styles.container }>
        { this.renderAdvertList() }
        <FloatingActionButton onTouchTap={this.openAdvertDialog} disabled={ !this.props.user.authenticated } style={ styles.floatingButton }>
          <ContentAddIcon />
        </FloatingActionButton>
        <AdvertDialog />
      </div>
    );
  }
}

AdvertListContainer.propTypes = {
  adverts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    adverts: state.get('advert').get('adverts').toJS(),
    user: state.get('user').toJS(),
    category: state.get('category').toJS()
  };
}

export default connect(mapStateToProps)(AdvertListContainer);
