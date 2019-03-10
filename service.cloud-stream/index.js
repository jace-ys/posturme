const config = require('config');
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const redis = require('redis');
const express = require('express');
const app = express();

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
});

redisClient.on('connect', () => {
  console.log('[Cloud Stream] PubClient connected to Redis server');
});

redisClient.on('error', (err) => {
  console.log(`[Cloud Stream] PubClient error occurred: ${err}`);
});

const pubsubHandler = message => {
  console.log(`New data received from Google Cloud: ${message.data}`);
  message.ack();
  redisClient.publish('cloud-stream', message.data);
};

const posturmeSub = pubsub.subscription('posturme-sub');
posturmeSub.on('message', pubsubHandler);

const port = 80;
app.listen(port, () => {
  console.log(`[Cloud Stream] Service running on port ${port}`);
});
