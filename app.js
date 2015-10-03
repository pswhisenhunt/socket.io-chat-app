// this is the same as var express = require('express'); var app = express();
var app = require('express')();

// this line of code consolidates the following steps:
// var http = require('http');
// var server = http.createServer(app);
// and you would call the listen method on server not http like below.

var http = require('http').Server(app);

var io = require('socket.io')(http);

// route defined here in this example, not in a separate file like I usually do.
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(8000, function() {
  console.log('listening on port 8000....');
});
