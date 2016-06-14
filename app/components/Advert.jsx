import React, { Component, PropTypes } from 'react';

import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DateIcon from 'material-ui/svg-icons/action/event';
import AuthorIcon from 'material-ui/svg-icons/action/account-circle';
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { green500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

const initialAdvertHeight = 72;

const styles = {
  container: {
    display: 'flex',
    flex: '1'
  },

  contentBox: {
    container: {
      position: 'relative',
      padding: '15px 15px 5px 15px',
      fontSize: '18px',
      color: '#333',
      fontWeight: '400',
      lineHeight: '24px',
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      maxHeight: initialAdvertHeight + 'px',
      boxSizing: 'content-box',
      transition: 'max-height 0.3s ease-in-out'
    },

    shadowContainer: {
      position: 'absolute',
      pointerEvents: 'none',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      boxShadow: 'inset 0px -20px 40px 10px rgba(255,255,255,1)',
      transition: 'box-shadow 0.3s ease-in-out'
    },

    shadowContainerHidden: {
      position: 'absolute',
      pointerEvents: 'none',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      boxShadow: 'none',
      transition: 'box-shadow 0.3s ease-in-out'
    },

    actionsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '30px'
    },

    link: {
      color: green500,
      fontSize: '16px',
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },

  headerBox: {
    container: {
      color: '#555',
      background: '#fbfbfb',
      width: '100%',
      padding: '5px 15px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },

    titleBox: {
      maxWidth: '550px'
    },

    title: {
      fontWeight: '300',
      letterSpacing: '0.01em',
      fontSize: '36px',
      margin: '0px',
      marginTop: '5px'
    },

    category: {
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#555'
    },

    categoryIcon: {
      color: '#555555',
      width: '16px',
      height: '16px',
      lineHeight: '16px',
      verticalAlign: 'middle'
    },

    details: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '600',
      textAlign: 'right',
      flexGrow: '1',
      justifyContent: 'flex-end'
    },

    icon: {
      width: '16px',
      verticalAlign: 'middle',
      color: green500
    }
  },

  mainBox: {
    position: 'relative'
  },

  editBox: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    transition: 'width 0.2s ease-in-out',
    position: 'relative',
    right: '-6px',
    height: '96px',
    maxWidth: '60px'
  },

  markedText: {
    background: green500,
    color: '#fff',
    transition: 'transform 0.1s ease-in-out',
    display: 'inline-block',
    transform: 'scale(1.0)',
    whiteSpace: 'pre-wrap'
  },

  hidden: {
    display: 'none'
  }
};

class Advert extends Component {
  constructor(props) {
    super(props);
    this.renderEditBox = this.renderEditBox.bind(this);
    this.renderSendMessageButton = this.renderSendMessageButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.forceUpdate();
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.data);
  }

  handleEdit(e) {
    e.stopPropagation();
    this.props.onEdit(this.props.data);
  }

  handleExpand() {
    this.isExpandable() && this.props.onExpand(this.props.data);
  }

  handleSendMessage() {
    this.props.onSendMessage(this.props.data);
  }

  isExpandable() {
    return this.mounted && this.refs.advertBody && this.refs.advertBody.clientHeight > initialAdvertHeight;
  }

  renderEditBox() {
    if (this.props.editable) {
      return (
        <div style={ styles.editBox } className="advert-edit-box">
          <IconButton onTouchTap={ this.handleDelete }>
            <DeleteIcon color="#555" />
          </IconButton>
          <IconButton onTouchTap={ this.handleEdit }>
            <EditIcon color="#555" />
          </IconButton>
        </div>
      );
    }
    return (<div style={ styles.editBox }></div>);
  }

  renderSendMessageButton() {
    if (this.props.authenticated) {
      return (
        <FlatButton
          label="Wyślij wiadomość"
          primary={true}
          onTouchTap={this.handleSendMessage} />
      );
    } else {
      return (<div></div>);
    }
  }

  render() {
    const { data: advert } = this.props;

    const getMarked = (text, query) => {
      let index = text.toLowerCase().indexOf(query),
        length = query.length;

      if (query === '' || index === -1) {
        return text;
      }

      return (<span>
          {text.slice(0, index)}
          <span className="marked" style={styles.markedText}>{text.slice(index, index + length)}</span>
          {text.slice(index + length)}
        </span>);
    };

    return (
      <div style={ styles.mainBox } className="advert">
        <div style={ this.isExpandable() ? Object.assign({cursor: 'pointer'}, styles.headerBox.container) : styles.headerBox.container} onTouchTap={this.handleExpand}>
          <div style={ styles.headerBox.titleBox }>
            <div>
              <ArrowRightIcon style={ styles.headerBox.categoryIcon } color={styles.headerBox.categoryIcon.color} />
              <span style={styles.headerBox.category}>{ getMarked(advert.category.name, this.props.mark) }</span>
            </div>
            <h2 style={ styles.headerBox.title }>{ getMarked(advert.title, this.props.mark) }</h2>
          </div>
          <div style={ styles.headerBox.details }>
            <div>
              { getMarked(advert.user.profile.name, this.props.mark) } <AuthorIcon style={styles.headerBox.icon} color={styles.headerBox.icon.color} /><br/>
              { moment(advert.date).fromNow() } <DateIcon style={styles.headerBox.icon} color={styles.headerBox.icon.color} /><br/>
              { getMarked(advert.location, this.props.mark) } <LocationIcon style={styles.headerBox.icon} color={styles.headerBox.icon.color} />
            </div>
            { this.renderEditBox() }
          </div>
        </div>
        <div style={ advert.expanded && this.refs.advertBody ? Object.assign(styles.contentBox.container, {maxHeight: this.refs.advertBody.clientHeight + 'px'}) : Object.assign(styles.contentBox.container, {maxHeight: initialAdvertHeight + 'px'}) }>
          <div ref="advertBody">{ getMarked(advert.body, this.props.mark) }</div>
          <div style={ (advert.expanded || !this.isExpandable()) ? styles.contentBox.shadowContainerHidden : styles.contentBox.shadowContainer }></div>
        </div>
        <div style={styles.contentBox.actionsContainer}>
          <FlatButton
              style={this.isExpandable() ? {} : styles.hidden}
              label={advert.expanded ? 'Zwiń' : 'Czytaj dalej'}
              secondary={true}
              onTouchTap={this.handleExpand} />
          {this.renderSendMessageButton()}
        </div>
      </div>
    );
  }
}

export default Advert;

Advert.propTypes = {
  data: PropTypes.object.isRequired,
  mark: PropTypes.string,
  editable: PropTypes.bool,
  authenticated: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSendMessage: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};
