<<<<<<< HEAD
const { User, Admin } = require("../models");

module.exports = {
  login: async (req, res) => res.redirect("/auth/azureadoauth2"),

  loginCallback: async (req, res) => {
    const user_email = req.user.unique_name;
    try {
      var user = await User.findByPk(user_email);
      if (user) {
        user = user.dataValues;
        delete user.mobile_no;
        delete user.createdAt;
        delete user.updatedAt;
        req.session.user = user;
        var admin = await Admin.findOne({
          where: {
            admin_id: user_email,
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
};
=======
const { User, Admin, Role, Permission } = require("../models");

module.exports = {
    loginCallback: async (req, res) => {
        const user_email = req.user.unique_name;
        try {
            var user = await User.findByPk(user_email);
            if (user) {
                user = user.dataValues;
                delete user.mobile_no;
                delete user.createdAt;
                delete user.updatedAt;
                req.session.user = user;
                var admin = await Admin.findOne({
                    where: {
                        admin_id: user_email
                    },
                    include: [
                        'Roles',
                        'Permissions'
                    ],
                });
                if (admin) {
                    let permission = {};
                    permission['admin'] = admin.Permissions.map((permission) => {
                        let temp = {};
                        temp['name'] = permission.name;
                        temp['id'] = permission.perm_id;
                        return temp;
                    });;
                    await Promise.all(admin.Roles.map(async role => {
                        let perm = await role.getPermissions();
                        permission[role.name] = {};
                        permission[role.name]['perm'] = perm.map((permission) => {
                            let temp = {};
                            temp['name'] = permission.name;
                            temp['id'] = permission.perm_id;
                            return temp;
                        });
                        permission[role.name]['role_id'] = role.role_id;
                        permission[role.name]['role_level'] = role.level;
                        permission[role.name]['org_id'] = role.org_id;
                    }));
                    req.session.admin = permission;
                }
            }
            res.redirect("/");
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        req.logout();
        res.redirect("/");
    }
}
>>>>>>> 432db78e288b315d7ce79da3cfc83d53f7436476
