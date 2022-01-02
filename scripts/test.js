const { sequelize, User, Admin, Organization, Role, Permission } = require("../models");
const { UserLog, AdminLog, RoleLog, OrganizationLog, PermissionLog, sequelizelog } = require("../models/log");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Main Database Connected!");
    await sequelize.sync({ alter: true, force: true });
    await sequelizelog.authenticate();
    console.log("Logging Database connected!");
    await sequelizelog.sync({ alter: true, force: true });

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
        name: "Rajjo",
        branch: "MnC",
        user_id: "ankushpatanwal1508@gmail.com",
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
      { admin_id: "a.patanwal@iitg.ac.in" },
      { admin_id: "ankushpatanwal1508@gmail.com" },
    ]);

    console.log("Mock data added successfully.");

    const CodingClubRole = await Role.findByPk(100);
    const GoHomeClubRole = await Role.findByPk(101);

    const AnkushAdmin = await Admin.findOne({ where: { admin_id: "a.patanwal@iitg.ac.in" }});
    const RajjoAdmin = await Admin.findOne({ where: { admin_id: "ankushpatanwal1508@gmail.com" }});
    const AnkushUser = await User.findByPk("a.patanwal@iitg.ac.in");
    const RajjoUser = await User.findByPk("ankushpatanwal1508@gmail.com");

    await RajjoAdmin.setUser(RajjoUser);
    await AnkushAdmin.setUser(AnkushUser);

    await GoHomeClubRole.addAdmin(AnkushAdmin);
    await CodingClubRole.addAdmin(RajjoAdmin);

    console.log("Roles assigned successfully.");

    await Permission.bulkCreate([
      {
        name: "Add points",
        perm_id: 301,
      },
      {
        name: "Approve point",
        perm_id: 302,
      },
      {
        name: "View flag",
        perm_id: 303,
      },
      {
        name: "Add role",
        perm_id: 304,
      },
      {
        name: "Approve flag",
        perm_id: 305,
      },
      {
        name: "View requests",
        perm_id: 306,
      },
      {
        name: "Approve requests",
        perm_id: 307,
      },
      {
        name: "Change rights",
        perm_id: 308,
      },
      {
        name: "All rights", //zero restriction access to everything
        perm_id: 1,
      },
      {
        name: "View personal points",
        perm_id: 101,
      },
    ]);
    console.log("Permissions added to db!");

    let CC_admin = await Role.findByPk(100);
    let GH_admin = await Role.findByPk(101);

    for (let i = 301; i <= 308; i++) {
      await CC_admin.addPermission(i);
      await GH_admin.addPermission(i);
    }
    console.log("Permissions added to roles!");
  } catch (e) {
    console.log(e);
  }


  // console.log("Logging Database Connected!");

  // const users = await User.findAll();
  // const admins = await Admin.findAll();
  // const roles = await Role.findAll();
  // const orgs = await Organization.findAll();
  // const perms = await Permission.findAll();

  // await UserLog.bulkCreateFromUser(users);
  // await AdminLog.bulkCreateFromAdmin(admins);
  // await OrganizationLog.bulkCreateFromOrganization(orgs);
  // await RoleLog.bulkCreateFromRole(roles);
  // await PermissionLog.bulkCreateFromPermission(perms);

  // console.log("Log tables added");
})();
