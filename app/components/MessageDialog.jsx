import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field, formValueSelector } from 'redux-form/immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { sendMessage } from 'actions/conversations';
import { setSnackbarInfo } from 'actions/layout';

const styles = {
  dialog: {
    width: '100%',
    maxWidth: '830px'
  },

  bodyInput: {
    marginBottom: '12px'
  },

  submitButton: {
    display: 'none'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

const validate = (values) => {
  let errors = {};

  if (!values.get('text')) {
    errors.text = 'Treść wiadomości jest wymagana';
  }

  return errors;
};

class MessageDialog extends Component {
  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(values) {
    this.props.dispatch(sendMessage({
      recipient: values.get('recipient'),
      text: values.get('text')
    })).then(response => {
      if (response) {
        this.props.dispatch(setSnackbarInfo('Wiadomość wysłana'));
        this.props.onClose();
      } else {
        this.props.dispatch(setSnackbarInfo('Wystąpił problem podczas wysyłania wiadomości'));
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let actions = [
      <FlatButton
        label="Anuluj"
        disabled={this.props.pending}
        onTouchTap={this.props.onClose} />,
      <FlatButton
        label="Wyślij"
        primary={true}
        disabled={this.props.pending}
        onTouchTap={handleSubmit(this.submitMessage)} />];

    return (
      <Dialog
        title="Nowa wiadomość"
        modal={true}
        autoScrollBodyContent={true}
        actions={actions}
        open={this.props.open}
        contentStyle={styles.dialog}
        onRequestClose={this.closeMessageDialog}>
        <p>Skontaktuj się z użytkownikiem <b>{this.props.recipientName}</b>:</p>
        <form style={styles.form} name="messageForm" onSubmit={handleSubmit(this.submitMessage)}>
          <Field name="text"
            type="text"
            style={styles.bodyInput}
            component={body =>
              <TextField
                fullWidth={true}
                disabled={this.props.pending}
                floatingLabelText="Treść wiadomości"
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

MessageDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

const formData = {
  form: 'message',
  validate
};

const formSelector = formValueSelector('message');

export default connect((state) => {
  return {
    recipientName: formSelector(state, 'recipientName')
  };
})(reduxForm(formData)(MessageDialog));
