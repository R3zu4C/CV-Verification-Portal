const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  host: process.env.REDIS_CLIENT_HOST,
  port: 16854,
  auth_pass: process.env.REDIS_OAUTH_PASS,
  no_ready_check: true,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

module.exports = {
  redisClient: redisClient,
  RedisStore: RedisStore,
  session: session,
};
