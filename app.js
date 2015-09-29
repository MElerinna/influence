var io = require('socket.io');

var express = require('express');
var app = express();
var choices = require('./choices.json');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//
	res.sendFile(__dirname + '/index.html');
});

var start = function (i) {

};

start(0);

var votes = {
	'lynyrd skynyrd': 0,
	'judas priest': 0
};

io.on('connection', function(socket){
  socket.emit('message', 'welcome');


  console.log('a user connected');
  socket.on('choice', function(what){
    if (what === 'lynyrd skynyrd') {
      votes['lynyrd skynyrd']++;
    } else {
      votes['judas priest']++;
    }
    socket.emit('total', votes);
  });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});



