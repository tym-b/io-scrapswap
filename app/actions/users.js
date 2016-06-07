import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import { SubmissionError } from 'redux-form';

import * as types from 'constants';

polyfill();

function makeUserRequest(method, data, api='/login') {
  return request[method](api, data);
}

function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  };
}

function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    data: {
      user: data
    }
  };
}

function loginFailure(error = null) {
  return {
    type: types.LOGIN_FAILURE,
    data: {
      error: error
    }
  };
}

export function login(data) {
  return dispatch => {
    dispatch(loginRequest());
    return makeUserRequest('post', data, '/login')
    .then(response => {
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
      } else {
        dispatch(loginFailure(response.data.message));
        throw new SubmissionError(response.data.message);
      }
    })
    .catch(err => {
      dispatch(loginFailure(err.data.message));
      throw new SubmissionError(err.data.message);
    });
  }
}

export function logout() {
  return dispatch => {
    const promise = makeUserRequest('post', null, '/logout');
    promise.then(() => {
      dispatch(push('/'));
    });
    return {
      type: 'LOGOUT',
      promise: promise
    }
  }
}

function registerRequest() {
  return {
    type: types.REGISTER_REQUEST
  };
}

function registerSuccess(data) {
  return {
    type: types.REGISTER_SUCCESS,
    data: {
      user: data
    }
  };
}

function registerFailure(error = null) {
  return {
    type: types.REGISTER_FAILURE,
    data: {
      error: error
    }
  };
}

export function register(data) {
  return dispatch => {
    dispatch(registerRequest());
    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(registerSuccess(response.data));
        } else {
          dispatch(registerFailure(response.data.message));
          throw new SubmissionError(err.data.message);
        }
      })
      .catch(err => {
        dispatch(registerFailure(err.data.message));
        throw new SubmissionError(err.data.message);
      });
  };
  return {
    type: types.SIGNUP,
    promise: makeUserRequest('post', data, '/signup')
  };
}
