const { User, Admin } = require("../models");

module.exports = {
  login: async (req, res) => res.redirect("/auth/azureadoauth2"),

  loginCallback: async (req, res) => {
    const user_id = req.user.unique_name;
    req.session.userId = user_id;
    res.redirect("/");
  },

  logout: (req, res) => {
    req.session.destroy();
    req.logout();
    res.redirect("/");
  },

  status: async (req, res) => {
    let user_id = -1;
    if(req.session.userId) user_id = req.session.userId;
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
