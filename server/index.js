'use strict';

var express = require('express');
var app = express();
var http = require('http');
var Twit = require('twit');
var localTunnel = require('localtunnel');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var config = require('./config');

var twit = new Twit(config.twitter);

server.listen(config.port);

localTunnel(config.port, {subdomain: 'tweetes'}, (err, tunnel) => {
  if (err) {
    return console.log(err);
  }
  console.log('tunnel running on: ', tunnel.url);
});

io.sockets.on('connection', (socket) => {
  console.log('connect');
  // socket.emit('tweet', {text: 'test, test, wows'});

  socket.on('tag', (data) => {
    var stream = twit.stream('statuses/filter', ({track: data.hash}));

    stream.on('tweet', (tweet) => {
      io.sockets.emit('tweet', tweet);
    });
  });
});
