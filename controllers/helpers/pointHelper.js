const {
  Notification,
  Point,
  Request,
  User,
  Organization,
  Flag,
} = require("../../models");

<<<<<<< HEAD
const createPoint = async (pointData, userId, addedBy) => {
=======
const createPoint = async (pointData, userId, addedBy, transactionID) => {
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
  const point = await Point.create({
    title: pointData.title,
    description: pointData.description,
    user_id: userId,
    category: pointData.category,
<<<<<<< HEAD
    org_id: parseInt(pointData.org_id),
    added_by: addedBy,
    status: "P",
    visibility: "P",
=======
    org_id: pointData.org_id,
    added_by: addedBy,
    status: "P",
    visibility: "P",
  }, {
    transaction: transactionID
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
  });

  return point;
};

const createRequest = async (pointData, adminData, transactionID) => {
  const request = await Request.create({
    type: pointData.category,
    point_id: pointData.point_id,
    req_by: pointData.added_by,
    req_to: adminData.admin_id,
  }, {
    transaction: transactionID
  });
  request.admin = await request.getAdmin();
  return request;
};

<<<<<<< HEAD
const createFlag = async (flagData, flaggedBy) => {
  const flag = await Flag.create({
    flagged_by: flaggedBy,
    point_id: flagData.point_id,
  });

  return flag;
}

const createPointAdminNotifs = async (pointData, userData, adminData) => {
=======
const createFlag = async (flagData, flaggedBy, transactionID) => {
  const flag = await Flag.create({
    flagged_by: flaggedBy,
    point_id: flagData.point_id,
    description: flagData.description,
  }, {
    transaction: transactionID
  });
  return flag;
}

const createPointAdminNotifs = async (pointData, userData, adminData, requestId, transactionID) => {
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
  await Notification.create({
    type: "R",
    description: `${userData.name} has requested you to add a point: ${pointData.title}`,
    title: `${pointData.category} Request`,
    notif_to: adminData.admin_id,
    user_type: "A",
    req_id: requestId,
  }, {
    transaction: transactionID
  });
};

const createPointUserNotif = async (pointData, transactionID) => {
  await Notification.create({
    type: "P",
    description: `You have requested to add a point: ${pointData.title}`,
    title: `${pointData.category} Request`,
    notif_to: pointData.user_id,
    user_type: "U",
    point_id: pointData.point_id,
<<<<<<< HEAD
  });
};

const createFlagAdminNotif = async (flagData, adminData) => {
  const notif = await Notification.create({
=======
  }, {
    transaction: transactionID
  });
};

const createFlagAdminNotif = async (flagData, adminData, transactionID) => {
  await Notification.create({
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
    type: "F",
    description: `You have a flag approval request`,
    title: "Flag Request",
    notif_to: adminData.admin_id,
    user_type: "A",
    flag_id: flagData.flag_id,
<<<<<<< HEAD
=======
  }, {
    transaction: transactionID
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
  });

  notif.setFlag(flagData.flag_id);
};

<<<<<<< HEAD
const createFlagUserNotif = async (pointData) => {
  const notif = await Notification.create({
=======
const createFlagUserNotif = async (pointData, transactionID) => {
  await Notification.create({
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb
    type: "F",
    description: `Your point ${pointData.title} has been flagged`,
    title: "Point Flagged",
    notif_to: pointData.user_id,
    user_type: "U",
    point_id: pointData.point_id,
<<<<<<< HEAD
  });

  notif.setPoint(pointData.point_id);
}

module.exports = {
  addPointToDatabase: async (newPoint, userId) => {
    const point = createPoint(newPoint, userId, userId);
=======
  }, {
    transaction: transactionID
  });
}

module.exports = {
  addPointToDatabase: async (newPoint, userId, transactionID) => {
    const point = createPoint(newPoint, userId, userId, transactionID);
>>>>>>> 2200bfa3679e75863655bb9eddaa04560f136eeb

    console.log("Point added to database successfully.");

    return point;
  },

  addRequestToDatabase: async (point, transactionID) => {
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

    const requests = await Promise.all(requestTo.map(admin => createRequest(point, admin, transactionID)));

    console.log("Requests added to database successfully.");

    return requests;
  },

  addPointNotifsToDatabase: async (point, requests, transactionID) => {
    const user = await User.findOne({ where: { user_id: point.user_id } });

    await Promise.all(requests.map((request) => {
      createPointAdminNotifs(point, user, request.admin, request.req_id, transactionID);
    }));

    await createPointUserNotif(point, transactionID);

    console.log("Notifications added to database successfully.");
  },

  addFlagToDatabase: async (flagData, flagged_by, transactionID) => {

    const flag = await createFlag(flagData, flagged_by, transactionID);

    console.log("Flag added to database successfully.");

    return flag;
  },

  addFlagNotifsToDatabase: async (flagData, pointData, transactionID) => {
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

    await Promise.all(flagTo.map((admin) => createFlagAdminNotif(flagData, admin, transactionID)));

    // await createFlagUserNotif(pointData, transactionID);

    console.log("Notifications added to database successfully.");
  },

  addFlagToDatabase: async (flagData, pointData, flagged_by) => {

    const flag = await createFlag(flagData, flagged_by);
    const flaggedBy = await User.findByPk(flagged_by);
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
