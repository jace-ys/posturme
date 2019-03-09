// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

//Create the client
const pubsub = new PubSub();

//Topic name
const topic = "flex-sensor";

const data = JSON.stringify({ foo: 'Sit properly' });
//Post the message
const dataBuffer = Buffer.from(data);
const messageId = pubsub.topic(topic).publish(dataBuffer);

console.log(`Message ${messageId} published.`);
