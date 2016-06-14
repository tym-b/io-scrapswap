var io = require('socket.io');

exports.runServer = function(server) {
    io = new io(server);

    io.on('connection', function(socket) {
        console.log('New socket connected');

        socket.on('init', function(id) {
            console.log("User " + id + " initialize connection");
            socket.join(id);
        });

        socket.on('disconnect', function() {
            console.log('Socket disconnected');
        });
    });
}

exports.sendMessage = function(message) {
    io.sockets.in(message.recipient).emit('message', message);
}
