const {
  Notification,
  Point,
  Request,
  User,
  Organization,
  Flag,
} = require("../../models");

const createPoint = async (pointData, userId, addedBy) => {
  const point = await Point.create({
    title: pointData.title,
    description: pointData.description,
    user_id: userId,
    category: pointData.category,
    org_id: parseInt(pointData.org_id),
    added_by: addedBy,
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

const createFlag = async (flagData, flaggedBy) => {
  const flag = await Flag.create({
    flagged_by: flaggedBy,
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
  addPointToDatabase: async (newPoint, userId) => {
    const point = createPoint(newPoint, userId, userId);

    console.log("Point added to database successfully.");

    return point;
  },

  addRequestToDatabase: async (point) => {
    const org = await Organization.findByPk(point.org_id);

    const roles = await org.getRoles();

    const requestTo = [];

    await Promise.all(roles.map(_role => (
      async (role) => {
        const admins = await role.getAdmins();
        for (const admin of admins) {
          requestTo.push(admin);
        }
      }
    )(_role)
    ));

    await Promise.all(requestTo.map(admin => createRequest(point, admin)));

    console.log("Requests added to database successfully.");
  },

  addPointNotifsToDatabase: async (point) => {
    const org = await Organization.findByPk(point.org_id);
    const roles = await org.getRoles();
    const user = await User.findOne({ where: { user_id: point.user_id } });

    const notifTo = [];

    await Promise.all(roles.map(_role => (
      async (role) => {
        const admins = await role.getAdmins();
        for (const admin of admins) {
          notifTo.push(admin);
        }
      })(_role)
    ));

    await Promise.all(notifTo.map((admin) => createPointAdminNotifs(point, user, admin)));

    await createPointUserNotif(point);

    console.log("Notifications added to database successfully.");
  },

  addFlagToDatabase: async (flagData, pointData, flagged_by) => {

    const flag = await createFlag(flagData, flagged_by);
    const flaggedBy = await User.findByPk(flagged_by);
    flag.setPoint(pointData);
    flag.setUser(flaggedBy);

    console.log("Flag added to database successfully.");

    return flag;
  },

  addFlagNotifsToDatabase: async (flagData, pointData) => {
    const org = await Organization.findByPk(pointData.org_id);

    const roles = await org.getRoles();

    const flagTo = [];

    await Promise.all(roles.map((_role) => (
      async (role) => {
        const admins = await role.getAdmins();
        for (const admin of admins) {
          flagTo.push(admin);
        }
      })(_role)
    ));

    await Promise.all(flagTo.map((admin) => createFlagAdminNotif(flagData, admin)));

    await createFlagUserNotif(pointData);

    console.log("Notifications added to database successfully.");
  },
};
