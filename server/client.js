'use strict';

const io = require('socket.io-client');

const client = io.connect('https://tweetes.localtunnel.me');

client.on('connect', () => {
  client.emit('tag', {hash: 'win'});
});

client.on('tweet', (tweet) => {
  console.log(tweet.text);
});
