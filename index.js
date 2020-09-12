var express = require('express');
var socket = require('socket.io');

var port = 4556;
var chatEvent = "chat";
var typingEvent = 'typing';


// App setup
var app = express();

var server = app.listen(port, function () {
    console.log('listening to request at port ' + port);
})

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function (socket) {

    console.log('made socket connection', socket.id)

    // Handle chat event
    socket.on(chatEvent, function (data) {
        io.sockets.emit(chatEvent, data)
    });

    // Handle typing event
    socket.on(typingEvent, function (data) {
        socket.broadcast.emit(typingEvent, data);
    });
})
