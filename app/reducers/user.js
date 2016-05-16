import Immutable from 'immutable';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR } from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  authenticated: false
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('pending', true);

    case LOGIN_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', true)
        .merge(action.userData);

    case LOGIN_ERROR:
      return state.set('pending', false)
        .set('authenticated', false);

    case SIGNUP:
      return state.set('pending', true);

    case SIGNUP_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', true)
        .merge(action.userData);

    case SIGNUP_ERROR:
      return state.set('pending', false)
        .set('authenticated', false);

    case LOGOUT:
      return state.set('pending', true);

    case LOGOUT_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', false);

    case LOGOUT_ERROR:
      return state.set('pending', false)
        .set('authenticated', true);

    default:
      return state;
  }
}
