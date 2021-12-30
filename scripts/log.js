const { UserLog, AdminLog, RoleLog, OrganizationLog, PermissionLog } = require("../models/log");
const { User, Admin, Role, Organization, Permission, sequelize } = require("../models");

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database Connected!");

        const users = await User.findAll();
        const admins = await Admin.findAll();
        const roles = await Role.findAll();
        const orgs = await Organization.findAll();
        const perms = await Permission.findAll();

        UserLog.bulkCreateFromUser(users);
        AdminLog.bulkCreateFromAdmin(admins);
        RoleLog.bulkCreateFromRole(roles);
        OrganizationLog.bulkCreateFromOrganization(orgs);
        PermissionLog.bulkCreateFromPermission(perms);
    }
    catch (err) {
        console.log(err);
    }
})();