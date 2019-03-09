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

const flexHandler = message => {
  console.log(`Flex: ${message.data}`);
  message.ack();
  redisClient.publish('cloud-stream', message.data);
};

const acelHandler = message => {
  console.log(`Acel: ${message.data}`);
  message.ack();
  redisClient.publish('cloud-stream', message.data);
}

const flexSub = pubsub.subscription('flex-sub');
const acelSub = pubsub.subscription('acel-sub');
flexSub.on('message', flexHandler);
acelSub.on('message', acelHandler);

const port = 80;
app.listen(port, () => {
  console.log(`[Cloud Stream] Service running on port ${port}`);
});
