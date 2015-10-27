'use strict';

var express = require('express');
var app = express();
var http = require('http');
var Twit = require('twit');
// var localTunnel = require('localtunnel');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var config = require('./config');

var twit = new Twit(config.twitter);

server.listen(config.port);


io.sockets.on('connection', (socket) => {
  console.log('connect');
  io.sockets.emit('tweet', {
    text: 'test tweet',
    user: {
      name: 'Some human',
      handle: 'testhandle',
      image: 'http://slacy.me/images/favicon.png'
    }
  });

  socket.on('tag', (data) => {
    console.log(data);
    var stream = twit.stream('statuses/filter', ({track: data.hash}));

    stream.on('tweet', (tweet) => {
      console.log(tweet.text);
      io.sockets.emit('tweet', {
        text: tweet.text,
        user: {
          name: tweet.user.name,
          handle: tweet.user.screen_name,
          image: tweet.user.profile_image_url
        }
      });
    });
    stream.on('error', (err) => {
      console.log(err);
    });
  });
});
