const Notification = require("../models/Notification");
const User = require("../models/User");
const Organization = require("../models/Organization");

module.exports.pointRequest = async (req, res, next) => {
  try {
    const user = await User.findByPk(parseInt(req.body.s_id));

    const req_to = await Organization.findByPk(parseInt(req.body.org_id));

    const admin = await User.findByPk(req_to.head_id);
    // console.log(admin, user);

    const noti_admin = await Notification.create({
      type: "pointRequest",
      desc: `${user.name} has requested you to add ${req.body.category}`,
      title: `${req.body.category} Request`,
      notif_to: parseInt(req_to.head_id),
    });

    const noti_user = await Notification.create({
      type: "pointRequest",
      desc: `You have requested ${admin.name} to add ${req.body.category}`,
      title: `${req.body.category} Request`,
      notif_to: parseInt(req.body.s_id),
    });

    console.log("Notification added to the database successfully");

    next();
  } catch (error) {
    console.error("Error:" + error.message);
    res.status(400).send("Error in inserting new record");
  }
};
