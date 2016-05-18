/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

import { SubmissionError } from 'redux-form';

polyfill();

function makeAdvertRequest(method, id, data, api='/api/advert') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function fetchAdverts() {
  return {
    type: types.GET_ADVERTS,
    promise: makeAdvertRequest('get')
  };
}

export function addAdvertRequest() {
  return {
    type: types.ADD_ADVERT_REQUEST
  };
}

export function addAdvertSuccess(data) {
  return {
    type: types.ADD_ADVERT_SUCCESS,
    data: {
      advert: data
    }
  };
}

export function addAdvertFailure(error = null) {
  return {
    type: types.ADD_ADVERT_FAILURE,
    data: {
      error: error
    }
  };
}

export function addAdvert(data) {
  return dispatch => {
    dispatch(addAdvertRequest());
    return makeAdvertRequest('post', null, data)
    .then(response => {
      if (response.status === 200) {
        dispatch(addAdvertSuccess(response.data));
      } else {
        dispatch(addAdvertFailure(response.data.message));
        throw new SubmissionError(response.data.message);
      }
    })
    .catch(err => {
      dispatch(addAdvertFailure(err.data.message));
      throw new SubmissionError(err.data.message);
    });
  }
}

export function toggleDialog(open) {
  return {
    type: types.TOGGLE_ADVERT_DIALOG,
    data: {
      open: open
    }
  };
}
