import io from 'socket.io-client';
import { LOGIN_SUCCESS } from 'constants/index';
import { receiveMessage } from 'actions/conversations';
 
var socket = null;
 
export function conversationMiddleware(store) {
  return next => action => {
    const result = next(action);
 
    if (socket && action.type === LOGIN_SUCCESS) {
      socket.emit('init', action.req.data._id);
    }
 
    return result;
  };
};
 
export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  const loggedUserId = store.getState().get('user').get('_id');
  if (loggedUserId) {
    socket.on('connect', () => {
      socket.emit('init', loggedUserId);
    });
  }
 
  socket.on('message', data => {
    store.dispatch(receiveMessage(data));
  });
};
