// Imports
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const passport = require("passport");
const passportSetup = require("./passport");

const allRoute = require("./routes/allRoutes");
const authRoute = require("./routes/auth");

// Redis initialization
var { session, RedisStore, redisClient } = require("./database/redis_session");
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
// app.use(express.static("public"));

// Routes
app.use("/auth", authRoute);

app.use((req, res, next) => {
  if (!req.session || !req.session.user) {
    console.log("User is not logged in");
    return res.status(401).send("User is not logged in");
  }
  else console.log("User is logged in");
  next();
});
app.use("/", allRoute);

// Start the server
const server = app.listen(process.env.PORT, async () => {
  await sequelize.authenticate();
  console.log("Database connected.");
  console.log(`Server listening on http://localhost:${server.address().port}`);
});
