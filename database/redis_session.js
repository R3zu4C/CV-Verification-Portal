const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  host: "redis-16854.c11.us-east-1-3.ec2.cloud.redislabs.com",
  port: 16854,
  auth_pass: "xSXZXfLNbTj9j9Pv2rSyMC4b0LyWzU6G",
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
