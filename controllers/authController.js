const { User, Admin } = require("../models");

module.exports = {
  login: async (req, res) => res.redirect("/auth/azureadoauth2"),

  loginCallback: async (req, res) => {
    console.log(req.user);
    const user_id = req.user.unique_name;
    try {
      var user = await User.findByPk(user_id);
      if (user) {
        user = user.dataValues;
        delete user.mobile_no;
        delete user.createdAt;
        delete user.updatedAt;
        req.session.user = user;
        var admin = await Admin.findOne({
          where: {
            admin_id: user_id,
          },
          include: ["Roles", "Permissions"],
        });
        if (admin) {
          let permission = { 0: [] };
          admin.Permissions.forEach((_permission) => {
            let temp = {};
            if (_permission.perm_id > 200) {
              // permission[_permission.org_id] += _permission.perm_id; //TODO: add org level permissions
            }
            else {
              permission[0].push(_permission.perm_id)
            }
          });
          await Promise.all(
            admin.Roles.map(async (role) => {

              if (!permission[role.org_id]) {
                permission[role.org_id] = {};
                permission[role.org_id]['perm'] = [];
              }

              let perm = await role.getPermissions();

              perm.forEach((_permission) => {
                if (_permission.perm_id <= 200) {
                  if (!permission[0]['perm'].includes(_permission.perm_id))
                    permission[0]['perm'].push(_permission.perm_id);
                }
                else if (!permission[role.org_id]['perm'].includes(_permission.perm_id))
                  permission[role.org_id]['perm'].push(_permission.perm_id);
              });

              if (!permission[role.org_id]['role_level'])
                permission[role.org_id]['role_level'] = role.level;
              else
                permission[role.org_id]['role_level'] = Math.min(permission[role.org_id]['role_level'], role.level);

            })
          );
          req.session.admin = permission;
        }
      }
      res.redirect("back");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    req.logout();
    res.redirect("/");
  },

  status: async (req, res) => {
    try {
      let user_id = -1;
      if (req.session.user) {
        user_id = req.session.user.user_id;
      }
      console.log(req.session);
      const user = await User.findByPk(user_id, { include: "Flags" });
      const admin = req.session.admin;

      res.send({ user, admin });
    }
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};
