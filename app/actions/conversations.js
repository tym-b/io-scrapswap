/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'constants/index';

import _ from 'lodash';

import { SubmissionError } from 'redux-form';

polyfill();

function makeConversationRequest(method, id, data, api) {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function sendMessage(message) {
  return {
    type: types.MESSAGE_SEND,
    promise: makeConversationRequest('post', false, message, 'api/message/send')
  };
};

function conversationsInitialFetchRequest() {
  return {
    type: types.GET_CONVERSATIONS_REQUEST
  };
}

function conversationsInitialFetchSuccess(conversation, selectedConversation = null) {
  return {
    type: types.GET_CONVERSATIONS_SUCCESS,
    data: {
      conversation,
      selectedConversation
    }
  };
}

function conversationsInitialFetchFailure() {
  return {
    type: types.GET_CONVERSATIONS_FAILURE
  };
}

export function conversationsInitialFetch() {
  return dispatch => {
    dispatch(conversationsInitialFetchRequest());
    return makeConversationRequest('get', false, {}, 'api/conversation/all').then(response => {
      const conversations = response.data;
      const selectedConversation = _.first(conversations.sort((c1, c2) => new Date(c1.lastModificationDate) < new Date(c2.lastModificationDate)));

      if (!selectedConversation) {
        dispatch(conversationsInitialFetchSuccess(conversations));
      } else {
        makeConversationRequest('get', selectedConversation._id, {}, 'api/conversation').then(response => {
          dispatch(conversationsInitialFetchSuccess(conversations, response.data));
        }, response => {
          dispatch(conversationsInitialFetchFailure());
        });
      }
    }, reposnse => {
      dispatch(conversationsInitialFetchFailure());
    });
  }
};
