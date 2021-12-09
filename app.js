// Imports
const express = require('express');
const fs = require("fs");
require('dotenv').config();

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

// Add Dummy Data -- Uncomment to add mock data
// (async () => {
//   await User.bulkCreate([
//     {
//       s_id: 200123008,
//       f_name: 'Ankush',
//       l_name: 'Patanwal',
//       branch: 'MnC'
//     },
//     {
//       s_id: 190101090,
//       f_name: 'Swapnil',
//       l_name: 'Srivastava',
//       branch: 'CSE'
//     }
//   ]);

//   await Organization.create({
//     name: 'Coding Club',
//     head_id: 190101090
//   });

//   await Admin.create({
//     s_id: 190101090,
//     org_id: 100
//   });
// })();

// Routes
app.get('/', async (req, res) => {
  res.end(fs.readFileSync('./views/index.html'));
});
app.post('/addPoint', async (req, res) => {
  try {
    console.log(req.body);
    const p = await Point.create({
      desc: req.body.desc,
      s_id: parseInt(req.body.s_id),
      category: req.body.category,
      org_id: parseInt(req.body.org_id),
      added_by: parseInt(req.body.added_by),
      proof: req.body.proof
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
app.post('/upload', async (req, res) => {
  const fileName = req.headers["file-name"];
  req.on("data", chunk => {
    fs.appendFileSync('./uploads/' + fileName, chunk)
    console.log(`received chunk! ${chunk.length}`)
  })
  res.end("uploaded!")
})

// Start the server
const server = app.listen(3000, () => {
  console.log(`Server listening on http://localhost:${server.address().port}`);
});

