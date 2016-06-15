import Immutable from 'immutable';

import {
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
  SELECT_CONVERSATION_REQUEST,
  SELECT_CONVERSATION_SUCCESS,
  SELECT_CONVERSATION_FAILURE,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_RECEIVE
} from 'constants/index';

const initialState = Immutable.fromJS({
  pending: false,
  initialLoad: true,
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
      if (state.get('selectedConversation')) {
        const message = Immutable.fromJS(action.req.data);
        return state.updateIn(['selectedConversation', 'messages'], messages => messages.push(message))
                    .update('conversations', conversations => {
                      return conversations.update(
                        conversations.findIndex(conversation => conversation.get('_id') === state.get('selectedConversation').get('_id')),
                        conversation => {
                          return conversation.set('lastMessage', message)
                                             .set('lastModificationDate', message.get('date'));
                        }).sort((c1, c2) => new Date(c1.get('lastModificationDate')) > new Date(c2.get('lastModificationDate')) ? -1 : 1);
                    });
      }
      return state;

    case MESSAGE_RECEIVE:
      if (state.get('selectedConversation')) {
        const message = Immutable.fromJS(action.data.message);

        return state.update('conversations', conversations => {
          return conversations.map(conversation => {
            if (conversation.get('members').find(m => m.get('_id') === message.get('sender'))) {
              if (state.get('selectedConversation').get('_id') !== conversation.get('_id')) {
                return conversation.set('hasUnreadMessages', true)
                                   .set('lastMessage', message)
                                   .set('lastModificationDate', message.get('date'));
              }
              return conversation.set('lastMessage', message)
                                 .set('lastModificationDate', message.get('date'));
            }
            return conversation;
          }).sort((c1, c2) => new Date(c1.get('lastModificationDate')) > new Date(c2.get('lastModificationDate')) ? -1 : 1);
        }).update('selectedConversation', selectedConversation => {
          if (selectedConversation.get('members').find(m => m.get('_id') === message.get('sender'))) {
            return selectedConversation.update('messages', messages => messages.push(message));
          }
          return selectedConversation;
        });
      }
      return state;

    default:
      return state;
  }
}
