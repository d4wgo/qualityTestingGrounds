var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var loki = require('lokijs');
var users;
var db = new loki('loki.json', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true, 
	autosaveInterval: 4000
});
function databaseInitialize() {
  users = db.getCollection("users");
  if (users === null) {
    users = db.addCollection("users", { disableChangesApi: false });
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', 2000);
app.use('/static', express.static(__dirname + '/static'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.post('/join', function(req, res){
	res.redirect('/play');
});
app.get('/play',function(req,res){
  res.sendFile(path.join(__dirname+'/play.html'));
});
app.get('/stats',function(req,res){
  res.sendFile(path.join(__dirname+'/stats.html'));
});
server.listen(2000, function() {
    console.log('Starting server on port 2000');
});
io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });
    //console.log(socket.id + " has connected");
    socket.on('userIn', function (data) {
      if(data.length > 3){
        //console.log("long enough");
        var tempUser = users.findOne({name: data});
        //console.log(tempUser);
        if(tempUser == null){
          //console.log("yesW");
          users.insert({name: data, plays: 0, wins: 0, highscore: 0});
          //console.log(users.data);
          //console.log("Succesfull sign in for \"" + data + "\"");
          socket.emit("successSignIn");
          //new user made
        }
        else{
          //sucess state, would actually send all the data about the user but i dont have any
          //console.log("Succesfull sign in for \"" + data + "\"");
          socket.emit("successSignIn");
        }
      }
      else{
        //console.log("The username \"" + data + "\" is too short");
        socket.emit("tooShortError");
      }
    });
    socket.on('viewStats', function (data) {
      var tempUser = users.findOne({name: data});
      if(tempUser != null){
        socket.emit("userFound");
      }
      else{
        socket.emit("userFalse");
      }
    });
    socket.on('getStats', function (data) {
      var tempUser = users.findOne({name: data});
      socket.emit("statsNw",tempUser.plays,tempUser.wins,tempUser.highscore);
    });
    socket.on('submitScore', function (user,won,score) {
      //console.log("Score recieved for " + user + " Score: " + score);
      var tempUser = users.findOne({name: user});
      tempUser.plays++;;
      if(won){
        tempUser.wins++;;
      }
      if(score > tempUser.highscore){
        tempUser.highscore = score;
      }
      users.update(tempUser);
    });
    
    socket.on('disconnect', function() {
		
	});
});




  