var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Sensor = require("./sensor.js");



Sensor.subscribe((msg)=> {
    //emit sensor data
    
},200);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });


io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('data', 1234);

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});
  

http.listen(3000, function(){
  console.log('listening on *:3000');
});