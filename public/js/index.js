var socket = io();
var user = "Username1";
socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: user,
        text: `${user} entered the chatroom.`
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log('New message', message);
});