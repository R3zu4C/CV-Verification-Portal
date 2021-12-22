const { sequelize, Permission, Role } = require("../models");

(async () => {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true, force: true });
    console.log("Database Connected!");

    await Permission.bulkCreate([
        {
            name: "Add points - Organization",
        },
        {
            name: "Approve point - Organization",
        },
        {
            name: "View flag - Organization",
        },
        {
            name: "Add role"
        },
        {
            name: "Approve flag - Organization"
        },
        {
            name: "View personal points"
        },
        {
            name: "View requests - Organization"
        },
        {
            name: "Approve requests - Organization"
        },
        {
            name: "Change rigts"
        }

    ]);
    console.log("Permissions added to db!")

    let CC_admin = await Role.findByPk(100);
    let GH_admin = await Role.findByPk(101);

    for (let i = 100; i < 109; i++) {
        if(i == 105 ) continue;
        await CC_admin.addPermission(i);
        await GH_admin.addPermission(i);
    }
    console.log("Permissions added to roles!")
})();
