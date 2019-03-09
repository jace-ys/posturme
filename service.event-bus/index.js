const config = require('config');
const redis = require('redis');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
});

io.on('connect', socket => {
  console.log('Client connected to socket server!');

  socket.on('disconnect', socket => {
    console.log('Client disconnected from socket server!');
  })
});

redisClient.on('connect', () => {
  console.log('[Event Bus] SubClient connected to Redis server');
});

redisClient.on('error', (err) => {
  console.log(`[Event Bus] SubClient error occurred: ${err}`);
});

redisClient.on('subscribe', (channel) => {
  console.log(`[Event Bus] SubClient subscribed to ${channel} channel`);
});

redisClient.on('message', (channel, data) => {
  console.log(`New data received from ${channel}: ${data}`);
  io.emit('new-data', data);
});

redisClient.subscribe('cloud-stream');

const port = 80;
server.listen(port, () => {
  console.log(`[Event Bus] Service running on port ${port}`);
});
