var session = require('express-session');
var redis = require("redis");
var redisStore = require('connect-redis')(session);

var redisClient = redis.createClient(
    {
        host: 'localhost',
        port: 6379
    }
);

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

module.exports.redisClient = redisClient;
module.exports.redisStore = redisStore;
module.exports.session = session;