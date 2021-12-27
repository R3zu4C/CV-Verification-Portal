const { User, Admin } = require("../models");

module.exports = {
  login: async (req, res) => res.redirect("/auth/azureadoauth2"),

  loginCallback: async (req, res) => {
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
          let permission = {};
          permission["admin"] = admin.Permissions.map((permission) => {
            let temp = {};
            temp["name"] = permission.name;
            temp["id"] = permission.perm_id;
            return temp;
          });
          await Promise.all(
            admin.Roles.map(async (role) => {
              let perm = await role.getPermissions();
              permission[role.name] = {};
              permission[role.name]["perm"] = perm.map((permission) => {
                let temp = {};
                temp["name"] = permission.name;
                temp["id"] = permission.perm_id;
                return temp;
              });
              permission[role.name]["role_id"] = role.role_id;
              permission[role.name]["role_level"] = role.level;
              permission[role.name]["org_id"] = role.org_id;
            })
          );
          req.session.admin = permission;
        }
      }
      res.redirect("/");
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
    let user_id = -1;
    if(req.session.user) user_id = req.session.user.user_id;
    const user = await User.findByPk(user_id, { include: "Flags" });
    const _admin = await Admin.findOne({
      where: {
        admin_id: user_id,
      },
      include: ["Roles", "Permissions"],
    });
    let permission;
    if (_admin) {
      permission = {};
      permission["admin"] = _admin.Permissions.map((permission) => {
        let temp = {};
        temp["name"] = permission.name;
        temp["id"] = permission.perm_id;
        return temp;
      });
      await Promise.all(
        _admin.Roles.map(async (role) => {
          let perm = await role.getPermissions();
          permission[role.name] = {};
          permission[role.name]["perm"] = perm.map((permission) => {
            let temp = {};
            temp["name"] = permission.name;
            temp["id"] = permission.perm_id;
            return temp;
          });
          permission[role.name]["role_id"] = role.role_id;
          permission[role.name]["role_level"] = role.level;
          permission[role.name]["org_id"] = role.org_id;
        })
      )
    }
  
    const admin = permission;
  
    res.send({ user, admin });
  }
};
