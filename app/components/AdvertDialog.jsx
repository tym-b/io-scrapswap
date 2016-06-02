import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field, formValueSelector } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { toggleDialog, addAdvert, editAdvert } from 'actions/adverts';
import { setSnackbarInfo } from 'actions/layout';

const styles = {
  dialog: {
    width: '100%',
    maxWidth: '830px'
  },

  submitButton: {
    display: 'none'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  a: {
    color: '#5eb45e',
    fontWeight: 'bold'
  }
};

const validate = (values) => {
  let errors = {};

  if (!values.get('title')) {
    errors.title = 'Tytuł ogłoszenia jest wymagany';
  }

  if (!values.get('category')) {
    errors.category = 'Proszę wybrać kategorię';
  }

  if (!values.get('location')) {
    errors.location = 'Lokalizacja jest wymagana';
  }

  if (!values.get('body')) {
    errors.body = 'Treść ogłoszenia jest wymagana';
  }

  return errors;
};

class AdvertDialog extends Component {
  constructor(props) {
    super(props);
    this.closeAdvertDialog = this.closeAdvertDialog.bind(this);
    this.submitAdvert = this.submitAdvert.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  submitAdvert(values) {
    let promise;

    const advert = {
      _id: values.get('_id'),
      title: values.get('title'),
      category: values.get('category'),
      location: values.get('location'),
      body: values.get('body')
    };

    if (values.get('_id')) {
      promise = this.props.dispatch(editAdvert(advert));
    } else {
      promise = this.props.dispatch(addAdvert(advert));
    }

    promise.then(() => {
      this.props.dispatch(setSnackbarInfo('Ogłoszenie zapisane'));
      this.props.dispatch(toggleDialog(false));
    }, () => {
      this.props.dispatch(setSnackbarInfo('Problem podczas zapisywania ogłoszenia'));
    });

    return promise;
  }

  closeAdvertDialog() {
    const { reset, pending } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(toggleDialog(false));
    }
  }

  getCategories() {
    return this.props.categories.map((category, index) => {
      return (
        <MenuItem key={ index } value={ category._id } primaryText={ category.name } />
      );
    });
  }

  render() {
    const { handleSubmit, editing } = this.props;

    let actions = [
      <FlatButton
        label="Zamknij"
        disabled={this.props.pending}
        onTouchTap={this.closeAdvertDialog} />];

    if (!editing) {
      actions.push(<FlatButton
        label="Dodaj"
        primary={true}
        disabled={this.props.pending}
        onTouchTap={handleSubmit(this.submitAdvert)} />);
    } else {
      actions.push(<FlatButton
        label="Zatwierdź"
        primary={true}
        disabled={this.props.pending}
        onTouchTap={handleSubmit(this.submitAdvert)} />);
    }

    return (
      <Dialog
        title={editing ? 'Edytuj ogłoszenie' : 'Nowe ogłoszenie'}
        modal={true}
        actions={actions}
        open={this.props.open}
        contentStyle={styles.dialog}
        onRequestClose={this.closeAdvertDialog}>
        <p>{editing ? 'Coś nie tak w Twoim ogłoszeniu? Nic nie szkodzi!' : 'Znajdź ludzi, którzy zrobią pożytek z Twoich śmieci!'}</p>
        <form style={styles.form} name="advertForm" onSubmit={handleSubmit(this.submitAdvert)}>
          <Field name="title"
            type="text"
            component={title =>
              <TextField
                fullWidth={true}
                disabled={this.props.pending}
                hintText="Oddam stare pręty"
                floatingLabelText="Tytuł"
                errorText={title.touched && title.error}
                {...title} />
            } />
          <Field name="category"
            type="text"
            component={category =>
              <SelectField
                fullWidth={true}
                value={category.value}
                disabled={this.props.pending}
                floatingLabelText="Kategoria"
                errorText={category.touched && category.error}
                {...category}
                onChange = {(event, index, value) => category.onChange(value)}>
                { this.getCategories() }
              </SelectField>
            } />
          <Field name="location"
            type="text"
            component={location =>
              <TextField
                fullWidth={true}
                disabled={this.props.pending}
                hintText="Poznań - Nowe Miasto"
                floatingLabelText="Lokalizacja"
                errorText={location.touched && location.error}
                {...location} />
            } />
          <Field name="body"
            type="text"
            component={body =>
              <TextField
                fullWidth={true}
                disabled={this.props.pending}
                hintText="Świeżutkie stalowe pręciki... Trochę rdzawe, ale na pewno coś się z nich zrobi!"
                floatingLabelText="Treść ogłoszenia"
                multiLine={true}
                errorText={body.touched && body.error}
                {...body} />
            } />
          <input disabled={this.props.pending} type="submit" style={styles.submitButton} />
        </form>
      </Dialog>
    );
  }
}

AdvertDialog.propTypes = {
  categories: PropTypes.array.isRequired,
  pending: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const formData = {
  form: 'advert',
  validate
};

const formSelector = formValueSelector('advert');

export default connect((state) => {
  return {
    editing: formSelector(state, '_id')
  };
})(reduxForm(formData)(AdvertDialog));
