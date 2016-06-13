import Immutable from 'immutable';

import {
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
  SELECT_CONVERSATION_REQUEST,
  SELECT_CONVERSATION_SUCCESS,
  SELECT_CONVERSATION_FAILURE
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  initialLoad: false,
  conversations: [],
  selectedConversation: null
});

export default function conversation(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS_REQUEST:
      return state.set('initialLoad', true);
      
    case GET_CONVERSATIONS_SUCCESS:
      return state.set('initialLoad', false)
                  .set('conversations', Immutable.fromJS(action.data.conversations))
                  .set('selectedConversation', Immutable.fromJS(action.data.selectedConversation));

    case GET_CONVERSATIONS_FAILURE:
      return state.set('initialLoad', false);

    case SELECT_CONVERSATION_REQUEST:
      return state.set('pending', true);

    case SELECT_CONVERSATION_FAILURE:
      return state.set('pending', false);

    case SELECT_CONVERSATION_SUCCESS:
      return state.set('pending', false)
                  .set('selectedConversation', action.req.data);

    default:
      return state;
  }
}
