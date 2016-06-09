import Immutable from 'immutable';

import {
  LAYOUT_TOGGLE_LOGIN,
  LAYOUT_TOGGLE_REGISTER,
  LAYOUT_TOGGLE_MENU,
  LAYOUT_SWITCH_LOGIN,
  LAYOUT_SWITCH_REGISTER,
  LAYOUT_SET_SNACKBAR_INFO,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from 'constants/index';

const initialState = Immutable.fromJS({
  loginOpen: false,
  registerOpen: false,
  menuOpen: false,
  snackbarInfo: ''
});

export default function layout(state = initialState, action) {
  switch (action.type) {
    case LAYOUT_TOGGLE_LOGIN:
      return state.set('loginOpen', typeof action.data.open !== 'undefined' ? action.data.open : !state.get('loginOpen'));

    case LAYOUT_TOGGLE_REGISTER:
      return state.set('registerOpen', typeof action.data.open !== 'undefined' ? action.data.open : !state.get('registerOpen'));

    case LAYOUT_TOGGLE_MENU:
      return state.set('menuOpen', typeof action.data.open !== 'undefined' ? action.data.open : !state.get('registerOpen'));

    case LAYOUT_SWITCH_LOGIN:
      return state.set('loginOpen', true).set('registerOpen', false);

    case LAYOUT_SWITCH_REGISTER:
      return state.set('loginOpen', false).set('registerOpen', true);

    case LAYOUT_SET_SNACKBAR_INFO:
      return state.set('snackbarInfo', action.data.info);

    case LOGOUT_SUCCESS:
      return state.set('snackbarInfo', 'Pomyślnie wylogowano');

    case LOGOUT_FAILURE:
      return state.set('snackbarInfo', 'Problem podczas wylogowywania');

    default:
      return state;
  }
};
