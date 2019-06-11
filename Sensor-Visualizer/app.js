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


Sensor.registerForNotifs((buffer)=> {

    let numTouches = buffer[1];
    
    let x = buffer[6];
    let y = buffer[8];

    if(numTouches == 2){
        //parse the buffer data and get the elements we want
        x = buffer[15];
        y = buffer[17];
       


    }
 

    let line = '';

    buffer.forEach((val)=> line+=val + ' ');
    console.log(line);
    console.log(buffer[6],buffer[8])
    console.log(buffer[15],buffer[17])

  
    //emit sensor data
    io.emit('data', {x,y, numTouches});
},5);
