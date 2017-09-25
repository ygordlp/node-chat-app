const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'chat',
        text: 'Welcome to Chatzasso',
        createdAt: Date.now()
    });

    socket.on('createMessage', (message) => {
        console.log('Message received', message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: Date.now()
        // });
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: Date.now()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

module.exports = { app };