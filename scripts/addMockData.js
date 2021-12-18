// Run 'npm run dev:mock' command to add mock data

const User = require("../models/User");
const Admin = require("../models/Admin");
const Organization = require("../models/Organization");
const sequelize = require("../database/connection");
const Role = require("../models/Role");
const AdminToRole = require("../models/AdminToRole");

// Add Dummy Data
addMockData = async () => {
  try {
    // await User.bulkCreate([
    //   {
    //     s_id: 200123008,
    //     name: "Ankush Patanwal",
    //     branch: "MnC",
    //     email: "a.patanwal@iitg.ac.in"
    //   },
    //   {
    //     s_id: 190101090,
    //     name: "Swapnil Srivastava",
    //     branch: "CSE",
    //     email: "s.swapnil@iitg.ac.in"
    //   },
    //   {
    //     s_id: 200123007,
    //     name: "Aman Kumar",
    //     branch: "MnC",
    //     email: "aman200123007@iitg.ac.in"
    //   }
    // ]);

    await Organization.bulkCreate([
      {
        name: "Coding Club"
      },
      {
        name: "Go Home Club"
      }
    ]);

    await Role.bulkCreate([
      {
        name: "Coding Club Admin",
        level: 1,
        org_id: 100
      },
      {
        name: "Go Home Club",
        level: 1,
        org_id: 101
      }
    ]);

    await Admin.bulkCreate([
      {
        s_id: 190101090
      },
      {
        s_id: 200123008
      }
    ]);

    await AdminToRole.bulkCreate([
      {
        s_id: 190101090,
        role_id: 100
      },
      {
        s_id: 200123008,
        role_id: 101
      }
    ]);
    
    console.log("Mock data added successfully.");
  } catch (err) {
    console.log(err);
  }
};

addMockData();
