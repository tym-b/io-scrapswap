import Immutable from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  INCREMENT_UNREAD_MESSAGES,
  GET_CONVERSATIONS_SUCCESS } from 'constants/index';

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
        .merge(action.data.user);

    case LOGIN_FAILURE:
      return state.set('pending', false)
        .set('authenticated', false);

    case REGISTER_REQUEST:
      return state.set('pending', true);

    case REGISTER_SUCCESS:
      return state.set('pending', false)
        .set('authenticated', true)
        .merge(action.data.user);

    case REGISTER_FAILURE:
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

    case GET_CONVERSATIONS_SUCCESS:
      return state.set('newMessagesCount', 0);

    case INCREMENT_UNREAD_MESSAGES:
      return state.update('newMessagesCount', c => c + 1);

    default:
      return state;
  }
}
