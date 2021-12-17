const Notification = require("../models/Notification");
const User = require("../models/User");
const Role = require("../models/Role");
const AdminToRole = require("../models/AdminToRole");
const { Op } = require('sequelize');

module.exports.pointRequest = async (req, res, next) => {
  try {
    const user = await User.findByPk(parseInt(req.body.s_id));
    const roles = await Role.findAll({
      where: {
        org_id: req.body.org_id
      }
    });
    let role_ids = [];
    roles.forEach(role => {
      role_ids.push(role.role_id);
    });
    // console.log(role_ids);
    const req_to = await AdminToRole.findAll({
      where: {
        role_id: {
          [Op.in]: role_ids
        }
      }
    });
    req_to.forEach(async (admin) => {
      const s_id = admin.s_id;
      const noti_admin = await Notification.create({
        type: 'R',
        description: `${user.name} has requested you to add ${req.body.category}`,
        title: `${req.body.category} Request`,
        notif_to: s_id,
        user_type: 'A'
      });
    });
    // console.log(admin, user);


    const noti_user = await Notification.create({
      type: 'P',
      description: `You have requested to add ${req.body.category}`,
      title: `${req.body.category} Request`,
      notif_to: parseInt(req.body.s_id),
      user_type: 'U'
    });

    console.log("Notification added to the database successfully");

    next();
  } catch (error) {
    console.error("Error:" + error.message);
    res.status(400).send("Error in inserting new record");
  }
};
