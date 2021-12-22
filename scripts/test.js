const { sequelize, User, Admin, Organization, Role } = require("../models");

(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true, force: true });
  console.log("Database Connected!");

  await User.bulkCreate([
    {
      roll_no: "200123008",
      name: "Ankush Patanwal",
      branch: "MnC",
      user_id: "a.patanwal@iitg.ac.in",
    },
    {
      roll_no: "190101090",
      name: "Swapnil Srivastava",
      branch: "CSE",
      user_id: "s.swapnil@iitg.ac.in",
    },
    {
      roll_no: "200123007",
      name: "Aman Kumar",
      branch: "MnC",
      user_id: "aman200123007@iitg.ac.in",
    },
  ]);

  await Organization.bulkCreate([
    { name: "Coding Club" },
    { name: "Go Home Club" },
  ]);

  await Role.bulkCreate([
    {
      name: "Coding Club Admin",
      level: 1,
      org_id: 100,
    },
    {
      name: "Go Home Club Admin",
      level: 1,
      org_id: 101,
    },
  ]);

  await Admin.bulkCreate([
    { admin_id: "s.swapnil@iitg.ac.in" },
    { admin_id: "a.patanwal@iitg.ac.in" },
    { admin_id: "aman200123007@iitg.ac.in"}
  ]);

  console.log("Mock data added successfully.");

  const CodingClubRole = await Role.findByPk(100);
  const GoHomeClubRole = await Role.findByPk(101);

  const SwapnilAdmin = await Admin.findOne({ where: { admin_id: "s.swapnil@iitg.ac.in" }});
  const SwapnilUser = await User.findByPk("s.swapnil@iitg.ac.in");
  const AnkushAdmin = await Admin.findOne({ where: { admin_id: "a.patanwal@iitg.ac.in"}});
  const AnkushUser = await User.findByPk("a.patanwal@iitg.ac.in");
  const AmanAdmin = await Admin.findOne({ where: { admin_id: "aman200123007@iitg.ac.in"}});
  const AmanUser = await User.findByPk("aman200123007@iitg.ac.in");

  await AmanAdmin.setUser(AmanUser);
  await SwapnilAdmin.setUser(SwapnilUser);
  await AnkushAdmin.setUser(AnkushUser);

  await CodingClubRole.addAdmin(SwapnilAdmin);
  await GoHomeClubRole.addAdmin(AnkushAdmin);
  await CodingClubRole.addAdmin(AmanAdmin);
  await GoHomeClubRole.addAdmin(AmanAdmin);

  console.log("Roles assigned successfully.");

  const k = await AnkushAdmin.getRoles();
  console.log(JSON.stringify(k));

})();
