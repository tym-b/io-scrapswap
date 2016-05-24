import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

import Advert from 'components/Advert';
import AdvertDialog from 'components/AdvertDialog';

import { fetchAdverts, toggleDialog, changeSearchQuery } from 'actions/adverts';
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
  },

  searchField: {
    marginBottom: '50px'
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
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  renderAdvertList() {
    let searchQuery = this.props.advert.searchQuery.toLowerCase();

    return this.props.advert.adverts
      .filter((advert) => {
        return advert.title.toLowerCase().indexOf(searchQuery) >= 0
          || advert.category.name.toLowerCase().indexOf(searchQuery) >= 0
          || advert.user.profile.name.toLowerCase().indexOf(searchQuery) >= 0
          || advert.location.toLowerCase().indexOf(searchQuery) >= 0
          || advert.body.toLowerCase().indexOf(searchQuery) >= 0
      })
      .map((advert, key) => {
        return (<Advert key={key} data={advert} mark={searchQuery} />);
      });
  }

  openAdvertDialog() {
    this.props.dispatch(toggleDialog(true));
  }

  handleSearchChange(e, value) {
    this.props.dispatch(changeSearchQuery(value));
  }

  render() {
    return (
      <div style={ styles.container }>
        <TextField
          style={ styles.searchField }
          fullWidth={true}
          onChange={this.handleSearchChange}
          defaultValue={this.props.advert.searchQuery}
          hintText="Wyszukaj ogłoszenie" />
        <ReactCSSTransitionGroup transitionName="advert" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        { this.renderAdvertList() }
        </ReactCSSTransitionGroup>
        <FloatingActionButton onTouchTap={this.openAdvertDialog} disabled={ !this.props.user.authenticated } style={ styles.floatingButton }>
          <ContentAddIcon />
        </FloatingActionButton>
        <AdvertDialog />
      </div>
    );
  }
}

AdvertListContainer.propTypes = {
  advert: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    advert: state.get('advert').toJS(),
    user: state.get('user').toJS(),
    category: state.get('category').toJS()
  };
}

export default connect(mapStateToProps)(AdvertListContainer);
