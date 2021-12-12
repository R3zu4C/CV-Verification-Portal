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
        // f_name: 'Ankush',
        // l_name: 'Patanwal',
        name: "Ankush Patanwal",
        branch: "MnC",
      },
      {
        s_id: 190101090,
        // f_name: 'Swapnil',
        // l_name: 'Srivastava',
        name: "Swapnil Srivastava",
        branch: "CSE",
      },
    ]);

    await Organization.create({
      name: "Coding Club",
      head_id: 190101090,
    });

    await Admin.create({
      s_id: 190101090,
      org_id: 100,
    });
    console.log("Mock data added successfully.");
  } catch (err) {
    console.log(err);
  }
};

addMockData();
