const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // If it loses connection retry evey 1000 secs
  retry_strategy: () => 1000,
});

// Duplicate of redis client
const sub = redisClient.duplicate();

const fib = (index) => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
};

sub.on('message', (channel, message) => {
  // Put value into a hash of values
  redisClient.hset('values', message, fib(parseInt(message)));
});

// Add value to redis instance
sub.subscribe('insert');
