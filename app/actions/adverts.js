import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

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
