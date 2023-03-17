const express = require('express')

const app = express();
const { instrument } = require("@socket.io/admin-ui");
// const path = require('path')
// const fs = require('fs')
const server = require('http').createServer(app);
// const server = require('https').createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app);
const PORT = 3000;

const io = require('socket.io')(server, {
    // cors: "*",
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000", "https://softmeck-renew.vercel.app"],
        credentials: true
    }
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
        console.log(users[parseInt(data.userid)], "connected", data, users)
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})
instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2a$12$gWoP0/1vZ.zqs.52wpYT..5.kxpWwxJV.3hXKGB8XX43j3mx6H076" // "changeit" encrypted with bcrypt

    },
    mode: "development",
});
server.listen(PORT, () => {
    console.log('Server is running', PORT);
});


