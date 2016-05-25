import React, { Component, PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form/immutable';

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
  },

  selectError: {
    marginTop: '-7px'
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
    const { reset } = this.props;

    let promise;

    if (this.props.advert.editAdvert) {
      promise = this.props.dispatch(editAdvert({
        _id: this.props.advert.editAdvert._id,
        title: values.get('title'),
        category: values.get('category'),
        location: values.get('location'),
        body: values.get('body')
      }));
    } else {
      promise = this.props.dispatch(addAdvert({
        title: values.get('title'),
        category: values.get('category'),
        location: values.get('location'),
        body: values.get('body')
      }));
    }

    promise.then(() => {
      reset();
      this.props.dispatch(setSnackbarInfo('Ogłoszenie zapisane'));
      this.props.dispatch(toggleDialog(false));
    });

    return promise;
  }

  closeAdvertDialog() {
    const { reset, advert: { pending } } = this.props;

    if (!pending) {
      reset();
      this.props.dispatch(toggleDialog(false));
    }
  }

  getCategories() {
    return this.props.category.categories.map((category, index) => {
      return (
        <MenuItem key={ index } value={ category._id } primaryText={ category.name } />
      );
    });
  }

  render() {
    const { handleSubmit, advert: {editAdvert} } = this.props;

    let actions = [
      <FlatButton
        label="Zamknij"
        disabled={this.props.advert.pending}
        onTouchTap={this.closeAdvertDialog} />];

    if (!editAdvert) {
      actions.push(<FlatButton
        label="Dodaj"
        primary={true}
        disabled={this.props.advert.pending}
        onTouchTap={handleSubmit(this.submitAdvert)} />);
    } else {
      actions.push(<FlatButton
        label="Zatwierdź"
        primary={true}
        disabled={this.props.advert.pending}
        onTouchTap={handleSubmit(this.submitAdvert)} />);
    }

    return (
      <Dialog
        title={editAdvert ? 'Edytuj ogłoszenie' : 'Dodaj ogłoszenie'}
        modal={true}
        actions={actions}
        open={this.props.advert.dialogOpen}
        contentStyle={styles.dialog}
        onRequestClose={this.closeAdvertDialog}>
        <p>Znajdź ludzi, którzy zrobią pożytek z Twoich śmieci!</p>
        <form style={styles.form} name="advertForm" onSubmit={handleSubmit(this.submitAdvert)}>
          <Field name="title"
            type="text"
            defaultValue={editAdvert ? editAdvert.title : ''}
            component={title =>
              <TextField
                fullWidth={true}
                disabled={this.props.advert.pending}
                hintText="Oddam stare pręty"
                floatingLabelText="Tytuł"
                errorText={title.touched && title.error}
                {...title} />
            } />
          <Field name="category"
            type="text"
            defaultValue={editAdvert ? editAdvert.category._id : ''}
            component={category =>
              <SelectField
                fullWidth={true}
                value={category.value}
                disabled={this.props.advert.pending}
                floatingLabelText="Kategoria"
                errorText={category.touched && category.error}
                errorStyle={styles.selectError}
                {...category}
                onChange = {(event, index, value) => category.onChange(value)}>
                { this.getCategories() }
              </SelectField>
            } />
          <Field name="location"
            type="text"
            defaultValue={editAdvert ? editAdvert.location : ''}
            component={location =>
              <TextField
                fullWidth={true}
                disabled={this.props.advert.pending}
                hintText="Poznań - Nowe Miasto"
                floatingLabelText="Lokalizacja"
                errorText={location.touched && location.error}
                {...location} />
            } />
          <Field name="body"
            type="text"
            defaultValue={editAdvert ? editAdvert.body : ''}
            component={body =>
              <TextField
                fullWidth={true}
                disabled={this.props.advert.pending}
                hintText="Świeżutkie stalowe pręciki... Trochę rdzawe, ale na pewno coś się z nich zrobi!"
                floatingLabelText="Treść ogłoszenia"
                multiLine={true}
                errorText={body.touched && body.error}
                {...body} />
            } />
          <input disabled={this.props.advert.pending} type="submit" style={styles.submitButton} />
        </form>
      </Dialog>
    );
  }
}

AdvertDialog.propTypes = {
  advert: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const formData = {
  form: 'advert',
  validate
};

export default reduxForm(formData)(AdvertDialog);
