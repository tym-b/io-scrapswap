import Immutable from 'immutable';

import {
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
  SELECT_CONVERSATION_REQUEST,
  SELECT_CONVERSATION_SUCCESS,
  SELECT_CONVERSATION_FAILURE,
  MESSAGE_SEND_SUCCESS
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
                  .set('selectedConversation', Immutable.fromJS(action.req.data));

    case MESSAGE_SEND_SUCCESS:
      return state.updateIn(['selectedConversation', 'messages'], messages => messages.push(Immutable.fromJS(action.req.data)))
                  .updateIn(['conversations'], conversations => {
                    return conversations.update(conversations.findIndex(conversation => conversation.get('_id') === state.get('selectedConversation').get('_id')), conversation => {
                      return conversation.set('lastMessage', Immutable.fromJS(action.req.data));
                    }).sort((c1, c2) => new Date(c1.get('lastMessage').get('date')) > new Date(c2.get('lastMessage').get('date')) ? -1 : 1);
                  });

    default:
      return state;
  }
}
