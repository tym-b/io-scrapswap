import Immutable from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE } from 'constants/index';

import { CHANGE as FORM_CHANGE } from 'redux-form/lib/actionTypes';

const initialState = Immutable.fromJS({
  pending: false,
  authenticated: false,
  loginError: null,
  registerError: null
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('pending', true);

    case LOGIN_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', true)
        .merge(action.userData);

    case LOGIN_FAILURE:
      return state.set('pending', false)
        .set('authenticated', false);

    case SIGNUP_REQUEST:
      return state.set('pending', true);

    case SIGNUP_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', true)
        .merge(action.userData);

    case SIGNUP_FAILURE:
      return state.set('pending', false)
        .set('authenticated', false);

    case LOGOUT_REQUEST:
      return state.set('pending', true);

    case LOGOUT_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', false);

    case LOGOUT_FAILURE:
      return state.set('pending', false)
        .set('authenticated', true);

    default:
      return state;
  }
}
