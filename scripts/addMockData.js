// Run 'npm run dev:mock' command to add mock data

const User = require("../models/User");
const Admin = require("../models/Admin");
const Organization = require("../models/Organization");
const sequelize = require("../database/connection");
const Role = require("../models/Role");
const relation = require('../models/relations');

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
      },
      {
        name: "Go Home Club Admin",
        level: 1,
      }
    ]);

    await Admin.bulkCreate([
      {
        admin_id: "s.swapnil@iitg.ac.in",
        userEmail: "s.swapnil@iitg.ac.in"
      },
      {
        admin_id: "a.patanwal@iitg.ac.in",
        userEmail: "a.patanwal@iitg.ac.in"
      },
      {
        admin_id: "aman200123007@iitg.ac.in",
        userEmail: "aman200123007@iitg.ac.in"
      }
    ]);

    console.log("Mock data added successfully.");

  } catch (err) {
    console.log(err);
  }
};

(async () => {
  await addMockData();
  // let codingClubAdmin = await Role.findByPk(100);
  // let goHomeClubAdmin = await Role.findByPk(101);

  // let swapnil = await Admin.findByPk("s.swapnil@iitg.ac.in");
  // let Ankush = await Admin.findByPk("a.patanwal@iitg.ac.in");
  // let Aman = await Admin.findByPk("aman200123007@iitg.ac.in", {
  //   // include: User
  // }
  // );

  // console.log(Aman);

  // let amanUser = await User.findByPk(Aman.admin_id);
  // let swapnilUser = await User.findByPk(swapnil.admin_id);
  // let ankushUser = await User.findByPk(Ankush.admin_id);

  // await amanUser.setAdmin(Aman);
  // await swapnilUser.setAdmin(swapnil);
  // await ankushUser.setAdmin(Ankush);

  // await Aman.setUser(amanUser);

  // await codingClubAdmin.addAdmin(swapnil);

  Aman.addRole(codingClubAdmin);
  Ankush.addRole(goHomeClubAdmin);
  swapnil.addRole(codingClubAdmin);
  Aman.addRole(goHomeClubAdmin);

  // console.log("Roles assigned successfully.");
  // console.log(Aman.user.name);
  // console.log(Aman);
})();

(async () => {
  let  amanAdmin = await Admin.findByPk("aman200123007@iitg.ac.in", {
    include: User
  });
  // console.log(amanAdmin);
  console.log(amanAdmin.user);
  })();