import React, { Component, PropTypes } from 'react';

import moment from 'moment';

import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DateIcon from 'material-ui/svg-icons/action/event';
import AuthorIcon from 'material-ui/svg-icons/action/account-circle';
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { green500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

const styles = {
  container: {
    display: 'flex',
    flex: '1'
  },

  contentBox: {
    container: {
      padding: '25px 25px 60px 15px',
      fontSize: '18px',
      color: '#333',
      fontWeight: '400',
      lineHeight: '24px'
    }
  },

  headerBox: {
    container: {
      color: '#555',
      background: '#fbfbfb',
      width: '100%',
      padding: '5px 15px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },

    titleBox: {
      maxWidth: '550px',
    },

    title: {
      fontWeight: '300',
      fontSize: '36px',
      letterSpacing: '0.01em',
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
      textAlign: 'right'
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
    marginLeft: '10px',
    width: '0px',
    height: '96px'
  },

  markedText: {
    background: green500,
    color: '#fff',
    transition: 'transform 0.1s ease-in-out',
    display: 'inline-block',
    transform: 'scale(1.0)'
  }
};

class Advert extends Component {
  constructor(props) {
    super(props);
    this.renderEditBox = this.renderEditBox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.data);
  }

  renderEditBox() {
    if (this.props.editable) {
      return (
        <div style={ styles.editBox } className="advert-edit-box">
          <IconButton onTouchTap={ this.handleDelete }>
            <DeleteIcon color="#555" />
          </IconButton>
          <IconButton>
            <EditIcon color="#555" />
          </IconButton>
        </div>
      );
    }
    return (<div style={ styles.editBox }></div>);
  }

  render() {
    let { data: advert } = this.props;

    let getMarked = (text, query) => {
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
        <div style={ styles.headerBox.container }>
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
        <div style={ styles.contentBox.container }>
          { getMarked(advert.body, this.props.mark) }
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
  onDelete: PropTypes.func
};
