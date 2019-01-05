var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', 2000);
app.use('/static', express.static(__dirname + '/static'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
server.listen(2000, function() {
    console.log('Starting server on port 2000');
});
var fs = require('fs');
io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });
    //console.log(socket.id + " has connected");
    socket.on('userIn', function (data) {
      //console.log(data);
      var a = edit(data);
      socket.emit(a);
    });
    socket.on('disconnect', function() {
		
	});
});


  