const { sequelize, Permission, Role } = require("../models");

(async () => {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true, force: true });
    console.log("Database Connected!");


    /* 
    Permission 1 is god level permissions
    Permission from 101 to 200 are mini god level permission - like maybe for each org or like view personal rights
    Permission from 201 to 300 are parentOrg level permissions
    Permission from 301 to 400 are org level permissions
    */

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
            name: "Change rigts",
            perm_id: 308,
        },
        {
            name: "All rights", //zero restriction access to everything
            perm_id: 1
        },
        {
            name: "View personal points",
            perm_id: 101
        }

    ]);
    console.log("Permissions added to db!")

    let CC_admin = await Role.findByPk(100);
    let GH_admin = await Role.findByPk(101);

    for (let i = 301; i <= 308; i++) {
        await CC_admin.addPermission(i);
        await GH_admin.addPermission(i);
    }
    console.log("Permissions added to roles!")
})();
