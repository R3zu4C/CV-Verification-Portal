// Imports
const express = require('express');
const fs = require("fs");
require('dotenv').config();
const allRoute = require('./routes/allRoutes');
const morgan = require('morgan');

// Redis initialization
// var { session, redisStore, redisClient } = require('./database/redis_session');

// Create an Express Application
const app = express();

// MicroSoft Login Middleware


// Middleware
// app.use(session({
//   secret: 'keyboard cat',
//   // create new redis store.
//   store: new redisStore({ client: redisClient }),
//   saveUninitialized: false,
//   resave: false,
//   cookie: {
//     secure: false, // if true only transmit cookie over https
//     httpOnly: false, // if true prevent client side JS from reading the cookie 
//     maxAge: 1000 * 60 * 10 // session max age in milliseconds, currently 10 hours
//   }
// }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// DB Connection
const sequelize = require('./database/connection');

// Routes
app.use('/', allRoute)

// Start the server
const server = app.listen(8008, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

