const { Role, Permission, Admin, Organization } = require("../models");
const AdminService = require("./helpers/adminHelper");

module.exports = {
    createAdmin: async (req, res) => {
        try {
            const adminService = new AdminService(req.session.user, req.session.admin);
            if (adminService.hasPermission("Add role") === false)
                return res.status(403).send({ error: "You do not have permission to approve this request" });

            const { admin_id } = req.body;
            const admin = await Admin.create({ admin_id });
            res.send(admin);
        }
        catch (err) {
            res.send(err);
        }
    },

    createRole: async (req, res) => {
        try {
            const { perm, name, level, org_id } = req.body;

            const adminService = new AdminService(req.session.user, req.session.admin);
            if (adminService.canCreateRole(perm, level, org_id) === false)
                return res.status(403).send({ error: "You do not have permission to approve this request" });

            const role = await Role.create({ name, level, org_id });
            if (perm && perm.length > 0) {
                await role.setPermissions(perm);
            }
            res.send(role);
        }
        catch (err) {
            res.send(err);
        }
    },

    changeRole: async (req, res) => {
        try {
            const { perm, name, role_id } = req.body;
            const role = await Role.findByPk(role_id);
            const org_id = role.org_id;
            const level = role.level;

            const adminService = new AdminService(req.session.user, req.session.admin);
            if (adminService.canCreateRole(perm, level, org_id) === false)
                return res.status(403).send({ error: "You do not have permission to approve this request" });


            if (name) await role.update({ name });

            if (perm && perm.length >= 0) {
                await role.setPermissions(perm);
            }

            res.send(role);
        }
        catch (err) {
            res.send(err);
        }
    },

    getRoles: async (req, res) => {
        try {
            const roles = await Role.findAll({
                include: [Admin, Permission]
            }); //TODO: Add restrictions
            res.send(roles);
        }
        catch (err) {
            res.send(err);
        }
    },

    getPermissions: async (req, res) => {
        try {
            const permissions = await Permission.findAll(); //TODO: Add restrictions
            res.send(permissions);
        }
        catch (err) {
            res.send(err);
        }
    },

    getAdmins: async (req, res) => {
        try {
            const admins = await Admin.findAll({ //TODO: Add restrictions
                include: [{
                    model: Role,
                    include: [{
                        model: Permission
                    }]
                }]
            });
            res.send(admins);
        }
        catch (err) {
            res.send(err);
        }
    },

    getOrgs: async (req, res) => {
        try {
            const orgs = await Organization.findAll({ //TODO: Add restrictions
                include: [{
                    model: Role,
                    include: [
                        Permission,
                        Admin
                    ]
                }]
            });
            res.send(orgs);
        }
        catch (err) {
            res.send(err);
        }
    },

    deleteAdmin: async (req, res) => {
        try {
            const { admin_id } = req.body; //TODO: Add restrictions
            const admin = await Admin.findByPk(admin_id);
            await admin.destroy();
            res.send(admin);
        }
        catch (err) {
            res.send(err);
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { role_id } = req.body; //TODO: Add restrictions
            const role = await Role.findByPk(role_id);
            await role.destroy();
            res.send(role);
        }
        catch (err) {
            res.send(err);
        }
    },
}