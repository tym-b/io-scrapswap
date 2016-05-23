/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

function makeAdvertRequest(method, id, data, api='/api/category') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function fetchCategories() {
  return {
    type: types.GET_CATEGORIES,
    promise: makeAdvertRequest('get')
  };
}
