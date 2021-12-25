const {
  Notification,
  Point,
  Request,
  User,
  Organization,
  Flag,
} = require("../../models");

const createPoint = async (pointData) => {
  const point = await Point.create({
    title: pointData.title,
    description: pointData.description,
    user_id: pointData.user_id,
    category: pointData.category,
    org_id: parseInt(pointData.org_id),
    added_by: pointData.added_by,
    status: "P",
    visibility: "P",
  });

  return point;
};

const createRequest = async (pointData, adminData) => {
  await Request.create({
    type: pointData.category,
    point_id: pointData.point_id,
    req_by: pointData.added_by,
    req_to: adminData.admin_id,
  });
};

const createFlag = async (flagData) => {
  const flag = await Flag.create({
    flagged_by: flagData.flagged_by,
    point_id: flagData.point_id,
  });

  return flag;
}

const createPointAdminNotifs = async (pointData, userData, adminData) => {
  await Notification.create({
    type: "R",
    description: `${userData.name} has requested you to add ${pointData.category}`,
    title: `${pointData.category} Request`,
    notif_to: adminData.admin_id,
    user_type: "A",
  });
};

const createPointUserNotif = async (pointData) => {
  await Notification.create({
    type: "P",
    description: `You have requested to add ${pointData.category}`,
    title: `${pointData.category} Request`,
    notif_to: pointData.user_id,
    user_type: "U",
    point_id: pointData.point_id,
  });
};

const createFlagAdminNotif = async (flagData, adminData) => {
  const notif = await Notification.create({
    type: "F",
    description: `You have a flag approval request`,
    title: "Flag Request",
    notif_to: adminData.admin_id,
    user_type: "A",
    flag_id: flagData.flag_id,
  });

  notif.setFlag(flagData.flag_id);
};

const createFlagUserNotif = async (pointData) => {
  const notif = await Notification.create({
    type: "F",
    description: `Your point ${pointData.title} has been flagged`,
    title: "Point Flagged",
    notif_to: pointData.user_id,
    user_type: "U",
    point_id: pointData.point_id,
  });

  notif.setPoint(pointData.point_id);
}

module.exports = {
  addPointToDatabase: async (newPoint) => {
    const point = createPoint(newPoint);

    console.log("Point added to database successfully.");

    return point;
  },

  addRequestToDatabase: async (point) => {
    const org = await Organization.findByPk(point.org_id);

    const roles = await org.getRoles();

    const requestTo = [];

    for (const role of roles) {
      const admins = await role.getAdmins();
      for (const admin of admins) {
        requestTo.push(admin);
      }
    }
    
    requestTo.forEach(async (admin) => await createRequest(point, admin));

    console.log("Requests added to database successfully.");
  },

  addPointNotifsToDatabase: async (point) => {
    const org = await Organization.findByPk(point.org_id);
    const roles = await org.getRoles();
    const user = await User.findOne({ where: { user_id: point.user_id } });

    const notifTo = [];

    for (const role of roles) {
      const admins = await role.getAdmins();
      for (const admin of admins) {
        notifTo.push(admin);
      }
    }
    
    notifTo.forEach(async (admin) => await createPointAdminNotifs(point, user, admin));

    await createPointUserNotif(point);

    console.log("Notifications added to database successfully.");
  },

  addFlagToDatabase: async (flagData, pointData) => {

    const flag = await createFlag(flagData);
    const flaggedBy = await User.findByPk(flagData.flagged_by);
    flag.setPoint(pointData);
    flag.setUser(flaggedBy);
    flaggedBy.addFlag(flag);

    console.log("Flag added to database successfully.");

    return flag;
  },

  addFlagNotifsToDatabase: async (flagData, pointData) => {
    const org = await Organization.findByPk(pointData.org_id);

    const roles = await org.getRoles();

    const flagTo = [];

    for (const role of roles) {
      const admins = await role.getAdmins();
      for (const admin of admins) {
        flagTo.push(admin);
      }
    }

    flagTo.forEach(async (admin) => await createFlagAdminNotif(flagData, admin));

    await createFlagUserNotif(pointData);

    console.log("Notifications added to database successfully.");
  },
};
