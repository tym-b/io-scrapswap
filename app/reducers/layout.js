import Immutable from 'immutable';

import {
  LAYOUT_TOGGLE_LOGIN,
  LAYOUT_TOGGLE_REGISTER,
  LAYOUT_SWITCH_LOGIN,
  LAYOUT_SWITCH_REGISTER
} from 'constants/index';

const initialState = Immutable.fromJS({
  loginOpen: false,
  registerOpen: false
});

export default function layout(state = initialState, action) {
  switch (action.type) {
    case LAYOUT_TOGGLE_LOGIN:
      return state.set('loginOpen', action.data.open || !state.get('loginOpen'));

    case LAYOUT_TOGGLE_REGISTER:
      return state.set('registerOpen', action.data.open || !state.get('registerOpen'));

    case LAYOUT_SWITCH_LOGIN:
      return state.set('loginOpen', true).set('registerOpen', false);

    case LAYOUT_SWITCH_REGISTER:
      return state.set('loginOpen', false).set('registerOpen', true);

    default:
      return state;
  }
};
