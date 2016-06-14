import io from 'socket.io-client';
 
export default function (store) {
  const socket = io.connect(`${location.protocol}//${location.host}`);
 
  socket.on('message', message => {
    store.dispatch(actions.addResponse(message));
  });
}
