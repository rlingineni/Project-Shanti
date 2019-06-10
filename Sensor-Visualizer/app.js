var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Sensor = require("./sensor.js");


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });


app.use('/dist', express.static('dist'))

io.on('connection', function(socket){
    console.log('a user connected');



    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});


http.listen(1010, function(){
  console.log('listening on *:1010');
});


Sensor.subscribe((buffer)=> {

    //parse the buffer data and get the elements we want

    let x = buffer[2];
    let y = buffer[5];
    
    let line = '';

    buffer.forEach((val)=> line+=val + ' ');
    console.log(line);
    console.log(x,y);
    //emit sensor data
    io.emit('data', {x,y});
},5);
