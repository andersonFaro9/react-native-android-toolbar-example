'use strict';

const io = require('socket.io-client');

const client = io.connect('http://192.168.56.1:5000');

client.on('connect', () => {
  client.emit('tag', {hash: 'win'});
});

client.on('tweet', (tweet) => {
  console.log(tweet.text);
});
