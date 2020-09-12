var host = "http://localhost";
var port = 4556
var chatEvent = 'chat';
var typingEvent = 'typing';

// Make connection
var socket = io.connect(host + ':' + port);

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click', function () {
    socket.emit(chatEvent, {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit(typingEvent, {
        handle: handle.value
    });
});

// Listen for events
socket.on(chatEvent, function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on(typingEvent, function (data) {
    feedback.innerHTML = '<p><i>' + data.handle + ' is typing </i></p>'
});
