const express = require('express');

const app = express();


const server = require('http').createServer(app);
const port = process.env.PORT || 8000;

const io = require('socket.io')(server, {
    cors: { origin: "*"}
});


io.on('connection', (socket) => {
    console.log('connection');

    socket.on('ChatToServer', (message) => {
        console.log(message);

        // io.sockets.emit('sendChatToClient', message);
        socket.broadcast.emit('sendChatToClient', message);
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});

server.listen(9000, () => {
    console.log('Server is running');
});
