const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Chatzasso', 'Welcome to Chatzasso'));

    socket.broadcast.emit('newMessage', generateMessage('Chatzasso', 'New user entered the room'));

    socket.on('createMessage', (message) => {
        console.log('Message received', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit - Other method.
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