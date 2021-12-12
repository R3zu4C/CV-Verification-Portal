// Imports
const express = require('express');
const fs = require("fs");
require('dotenv').config();
const allRoute = require('./routes/allRoutes');

// Create an Express Application
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// DB Connection
const sequelize = require('./database/connection');

// Routes
app.use('/', allRoute)

// Start the server
const server = app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

