import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { sendMessage } from 'actions/conversations';
import { setSnackbarInfo } from 'actions/layout';

import { reduxForm, Field } from 'redux-form/immutable';

const styles = {
  formContainer: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px'
  },

  inputContainer: {
    display: 'flex',
    flexGrow: '1',
    paddingLeft: '40px'
  },

  submitContainer: {
    marginLeft: '30px'
  },

  submitButton: {
    display: 'none'
  }
};

class ConversationMessageInput extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleSendMessage(values) {
    this.props.dispatch(sendMessage({
      recipient: this.props.recipient._id,
      text: values.get('text')
    })).then(() => {
      this.props.reset();
    }, () => {
      this.props.dispatch(setSnackbarInfo('Wystąpił problem z wysyłaniem wiadomości'));
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form name="conversation" style={styles.formContainer} onSubmit={handleSubmit(this.handleSendMessage)}>
        <div style={styles.inputContainer}>
          <Field name="text"
            type="text"
            component={text =>
              <TextField
                fullWidth={true}
                disabled={this.props.pending}
                hintText="Tu wpisz wiadomość"
                errorText={text.touched && text.error}
                {...text} />
            } />
        </div>
        <div style={styles.submitContainer}>
          <RaisedButton label="Wyślij" primary={true} onTouchTap={handleSubmit(this.handleSendMessage)} />
        </div>
        <input disabled={this.props.pending} type="submit" style={styles.submitButton} />
      </form>
    );
  }
}

ConversationMessageInput.PropTypes = {
  recipient: PropTypes.object.isRequired
};

const formData = {
  form: 'conversation-message'
};

export default reduxForm(formData)(ConversationMessageInput);