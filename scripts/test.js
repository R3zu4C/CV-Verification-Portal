const { sequelize, User, Admin, Organization, Role } = require("../models");

(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true, force: true });
  console.log("Database Connected!");

  await User.bulkCreate([
    {
      s_id: 200123008,
      name: "Ankush Patanwal",
      branch: "MnC",
      email: "a.patanwal@iitg.ac.in",
    },
    {
      s_id: 190101090,
      name: "Swapnil Srivastava",
      branch: "CSE",
      email: "s.swapnil@iitg.ac.in",
    },
    {
      s_id: 200123007,
      name: "Aman Kumar",
      branch: "MnC",
      email: "aman200123007@iitg.ac.in",
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
    },
    {
      name: "Go Home Club Admin",
      level: 1,
    },
  ]);

  await Admin.bulkCreate([
    { email: "s.swapnil@iitg.ac.in" },
    { email: "a.patanwal@iitg.ac.in" },
    { email: "aman200123007@iitg.ac.in" },
  ]);

  console.log("Mock data added successfully.");

  const CodingClubRole = await Role.findByPk(100);
  const GoHomeClubRole = await Role.findByPk(101);

  const SwapnilAdmin = await Admin.findOne({ where: { email: "s.swapnil@iitg.ac.in" }});
  const SwapnilUser = await User.findByPk("s.swapnil@iitg.ac.in");
  const AnkushAdmin = await Admin.findOne({ where: { email: "a.patanwal@iitg.ac.in"}});
  const AnkushUser = await User.findByPk("a.patanwal@iitg.ac.in");

  await SwapnilAdmin.setUser(SwapnilUser);
  await AnkushAdmin.setUser(AnkushUser);

  await CodingClubRole.addAdmin(SwapnilAdmin);
  await GoHomeClubRole.addAdmin(AnkushAdmin);

  console.log("Roles assigned successfully.");

  const k = await AnkushAdmin.getRoles();
  console.log(JSON.stringify(k));

})();
