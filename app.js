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
// require("./database/tableCreation.js");


const { addMockData, addAllUsers } = require("./data_initialization/userLoader");

// -- Uncomment to add mock data --
setTimeout(addMockData, 5000);

// -- Uncomment to add all users --
// addAllUsers(filename);

// Routes
app.use('/', allRoute)

// Start the server
const server = app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

