// Imports
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");

const homeRoute = require("./routes/homeRoutes");
const orgRoute = require("./routes/orgRoutes");
const authRoute = require("./routes/auth");
const searchRoute = require("./routes/searchRoutes");
const pointRoute = require("./routes/pointRoutes");
const requestRoute = require("./routes/requestRoutes");


// Redis initialization
const { session, RedisStore, redisClient } = require("./database/redis_session");
const { sequelize } = require("./models");

// Create an Express Application
const app = express();

// Middleware
app.use(
  session({
    secret: "keyboard cat",
    // create new redis store.
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in milliseconds, currently 10 hours
    },
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// app.use(express.static("public"));

// Routes
app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/orgs", orgRoute);
app.use("/search", searchRoute);
app.use("/requests", requestRoute);
app.use("/point", pointRoute);


// Start the server
const server = app.listen(process.env.PORT, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connected.");
  console.log(`Server listening on http://localhost:${server.address().port}`);
});
