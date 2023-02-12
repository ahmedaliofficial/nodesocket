const express = require('express')

const app = express();


const server = require('http').createServer(app);
const PORT =  5000;

const io = require('socket.io')(server, {
    cors: "*"
});

var users = [];

io.on('connection', (socket) => {
    // console.log(socket.handshake.query['user']);
    console.log('connect')
    
    socket.on('chattotserver', (message) => {
        // message = JSON.parse(message)
        // io.sockets.emit('sendChatToClient', message);
        socket.to(users[parseInt(message.to)]).emit('getclientchat', message);
    });
    socket.on('connecttoserver', (data) => {
        // io.sockets.emit('sendChatToClient', message);
        users[parseInt(data.userid)] = socket.id
        console.log(users[parseInt(data.userid)],"connected",data,users)
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(PORT, () => {
    console.log('Server is running');
});


