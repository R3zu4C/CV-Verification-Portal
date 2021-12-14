// Run 'npm run dev:mock' command to add mock data

const User = require("../models/User");
const Admin = require("../models/Admin");
const Organization = require("../models/Organization");
const sequelize = require("../database/connection");

// Add Dummy Data
addMockData = async () => {
  try {
    await User.bulkCreate([
      {
        s_id: 200123008,
        name: "Ankush Patanwal",
        branch: "MnC",
        email: "a.patanwal@iitg.ac.in"
      },
      {
        s_id: 190101090,
        name: "Swapnil Srivastava",
        branch: "CSE",
        email: "s.swapnil@iitg.ac.in"
      },
      {
        s_id: 200123007,
        name: "Aman Kumar",
        branch: "MnC",
        email: "aman200123007@iitg.ac.in"
      }
    ]);

    await Organization.bulkCreate([
      {
        name: "Coding Club",
        head_id: 190101090,
      },
      {
        name: "Go Home Club",
        head_id: 200123008
      }
    ]);

    await Admin.bulkCreate([
      {
        s_id: 190101090,
        org_id: 100
      },
      {
        s_id: 200123008,
        org_id: 101
      }
    ]);
    console.log("Mock data added successfully.");
  } catch (err) {
    console.log(err);
  }
};

addMockData();
