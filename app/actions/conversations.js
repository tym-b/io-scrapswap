/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'constants/index';

import { SubmissionError } from 'redux-form';

polyfill();

function makeMessageRequest(method, id, data, api) {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function sendMessage(message) {
  return {
    type: types.MESSAGE_SEND,
    promise: makeMessageRequest('post', false, message, 'api/message/send')
  };
};

export function getConversations() {
  return {
    type: types.GET_CONVERSATIONS,
    promise: makeMessageRequest('get', false, {}, 'api/conversation/all')
  };
};
