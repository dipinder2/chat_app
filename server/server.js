const express = require('express');
const app = express();

const server = app.listen(8000, () =>
console.log('The server is all fired up on port 8000')
);


const io = require('socket.io')(server, { cors:true });

//io.emit every socket 
//socket particular connection

io.on('connection', socket => {
    socket.emit('Welcome',socket.id)
    socket.on('msg', data => {
        io.emit("newMsg",data)
    });

});
