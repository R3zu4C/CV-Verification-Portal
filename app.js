// Imports
const express = require('express');
require('dotenv').config()

// Create an Express Application
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// DB Connection
const sequelize = require('./config/connection');

// DB Models
const User = require('./models/User');
const Admin = require('./models/Admin');
const Point = require('./models/Point');
const AdminToGroup = require('./models/AdminToGroup');
const Flag = require('./models/Flag');
const Group = require('./models/Group');
const GroupToPerm = require('./models/GroupToPerm');
const Organization = require('./models/Organization');
const Permission = require('./models/Permission');
const Request = require('./models/Request');

// Routes
app.get('/', async (req, res) => {
  const points = await Point.findAll();
  res.send("All Points: " + JSON.stringify(points));
});
app.post('/addPoint', async (req, res) => {
  try {
    const p = await Point.create({
      desc: req.body.desc,
      s_id: req.body.s_id,
      category: req.body.category,
      org_id: req.body.org_id,
      added_by: req.body.added_by
    });
    if(p) {
      res.send(p);
      console.log("Point added to database successfully.");
      console.log(JSON.stringify(p));
      const req_to = await Organization.findAll({
        where: {
          org_id: p.org_id
        }
      });
      const request = await Request.create({
        type: p.category,
        point_id: p.point_id,
        req_by: p.added_by,
        req_to: req_to[0].head_id
      });
      console.log("Requset added to database successfully.");
      console.log(JSON.stringify(request));
    }
  } catch (error) {
    console.error("Error:" + error.message);
    res.status(400).send('Error in inserting new record');
  }
});

// Start the server
const server = app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

