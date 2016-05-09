import {
  LAYOUT_TOGGLE_LOGIN,
  LAYOUT_TOGGLE_REGISTER
} from 'constants/index';

export default function advert(state = {
  loginOpen: false,
  registerOpen: false
}, action) {
  switch (action.type) {
    case LAYOUT_TOGGLE_LOGIN:
      return Object.assign({}, state, {
        loginOpen: action.data.open || !state.loginOpen
      });

    case LAYOUT_TOGGLE_REGISTER:
      return Object.assign({}, state, {
        registerOpen: action.data.open || !state.registerOpen
      });

    default:
      return state;
  }
}
