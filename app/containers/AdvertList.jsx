import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Immutable from 'immutable';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Advert from 'components/Advert';
import AdvertDialog from 'components/AdvertDialog';

import { fetchAdverts, toggleDialog, changeSearchQuery, confirmDelete, removeAdvert, toggleEditDialog } from 'actions/adverts';
import { fetchCategories } from 'actions/categories';

const styles = {
  container: {
    width: '95%',
    maxWidth: '800px',
    margin: '40px auto'
  },

  floatingButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px'
  },

  searchField: {
    marginBottom: '40px'
  },

  advertInfo: {
    fontSize: '16px',
    color: '#444'
  },

  confirmDialog: {
    width: '100%',
    maxWidth: '400px'
  },
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
    this.handleOnAdvertDelete = this.handleOnAdvertDelete.bind(this);
    this.cancelAdvertDelete = this.cancelAdvertDelete.bind(this);
    this.confirmAdvertDelete = this.confirmAdvertDelete.bind(this);
    this.handleOnAdvertEdit = this.handleOnAdvertEdit.bind(this);
  }

  openAdvertDialog() {
    this.props.dispatch(toggleDialog(true));
  }

  handleSearchChange(e, value) {
    this.props.dispatch(changeSearchQuery(value));
  }

  handleOnAdvertDelete(advert) {
    this.props.dispatch(confirmDelete(advert));
  }

  handleOnAdvertEdit(advert) {
    this.props.dispatch(toggleDialog(true, advert));
  }

  cancelAdvertDelete() {
    if (!this.props.advert.pending) {
      this.props.dispatch(confirmDelete(null));
    }
  }

  confirmAdvertDelete() {
    this.props.dispatch(removeAdvert(this.props.advert.confirmDelete));
  }

  renderAdvertList() {
    let searchQuery = this.props.advert.searchQuery.toLowerCase();

    let advertsToShow = this.props.advert.adverts
      .filter((advert) => {
        return advert.title.toLowerCase().indexOf(searchQuery) >= 0
          || advert.category.name.toLowerCase().indexOf(searchQuery) >= 0
          || advert.user.profile.name.toLowerCase().indexOf(searchQuery) >= 0
          || advert.location.toLowerCase().indexOf(searchQuery) >= 0
          || advert.body.toLowerCase().indexOf(searchQuery) >= 0
      });

    if (advertsToShow.length === 0) {
      if (this.props.advert.searchQuery === '') {
        return (<div style={ styles.advertInfo }>Nie ma jeszcze żadnych ogłoszeń :(</div>);
      } else {
        return (<div style={ styles.advertInfo }>Nie znaleziono ogłoszeń ze słowami kluczowymi <b>{ this.props.advert.searchQuery }</b> :(</div>);
      }
    }

    return advertsToShow.map((advert, key) => {
      return (<Advert key={key} data={advert} mark={searchQuery} onDelete={this.handleOnAdvertDelete} onEdit={this.handleOnAdvertEdit} editable={this.props.user.authenticated && advert.user._id === this.props.user._id} />);
    });
  }


  render() {
    const actions = [
      <FlatButton
        label="Nie"
        primary={false}
        disabled={this.props.advert.pending}
        onTouchTap={this.cancelAdvertDelete} />,
      <FlatButton
        label="Tak"
        primary={true}
        disabled={this.props.advert.pending}
        onTouchTap={this.confirmAdvertDelete} />,
    ];

    let advertInitialValues = null;

    if (this.props.advert.editAdvert) {
      advertInitialValues = Immutable.fromJS({
        _id: this.props.advert.editAdvert._id,
        title: this.props.advert.editAdvert.title,
        category: this.props.advert.editAdvert.category._id,
        location: this.props.advert.editAdvert.location,
        body: this.props.advert.editAdvert.body
      });
    }

    return (
      <div style={ styles.container }>
        <Dialog
          title="Usuń ogłoszenie"
          actions={actions}
          contentStyle={styles.confirmDialog}
          modal={false}
          onRequestClose={this.cancelAdvertDelete}
          open={!!this.props.advert.confirmDelete} >
          Czy na pewno chcesz usunąć ogłoszenie <b>{ this.props.advert.confirmDelete ? this.props.advert.confirmDelete.title : '' }</b>?
        </Dialog>
        <TextField
          id="searchField"
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
        <AdvertDialog
          open={ this.props.advert.dialogOpen }
          pending={ this.props.advert.pending }
          categories={ this.props.category.categories }
          initialValues={ advertInitialValues } />
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
