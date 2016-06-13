import Immutable from 'immutable';

import {
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  conversations: [],
  selectedConversation: null
});

export default function advert(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS_REQUEST:
      return state.set('pending', true);
      
    case GET_CONVERSATIONS_SUCCESS:
      debugger;
      return state.set('pending', false).set('conversations', Immutable.fromJS(action.req.data));

    case GET_CONVERSATIONS_FAILURE:
      return state.set('pending', false);

    default:
      return state;
  }
}
