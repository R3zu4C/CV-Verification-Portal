const {
  Notification,
  Point,
  Request,
  User,
  Organization,
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
    proof_link: pointData.proof_link,
  });

  return point;
};

const createRequest = async (pointData, adminData) => {
  await Request.create({
    type: pointData.category,
    point_id: pointData.point_id,
    req_by: pointData.added_by,
    req_to: adminData.user_id,
  });
};

const createPointAdminNotifs = async (pointData, userData, adminData) => {
  await Notification.create({
    type: "R",
    description: `${userData.name} has requested you to add ${pointData.category}`,
    title: `${pointData.category} Request`,
    notif_to: adminData.user_id,
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
  });
};

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

    roles.forEach(async (role) => {
      const admins = await role.getAdmins();
      admins.forEach(admin => {
        console.log(admin.user_id);
        requestTo.push(admin.user_id);
      });
    });
    
    requestTo.forEach(async (admin) => await createRequest(point, admin));

    console.log("Requests added to database successfully.");
  },

  addPointNotifsToDatabase: async (point) => {
    const org = await Organization.findByPk(point.org_id);
    const roles = await org.getRoles();
    const user = await User.findOne({ where: { user_id: point.user_id } });

    const requestTo = [];

    roles.forEach(async (role) => {
      const admins = await role.getAdmins();
      admins.forEach(admin => {
        console.log(admin.user_id);
        requestTo.push(admin.user_id);
      });
    });

    requestTo.forEach(async (admin) => await createPointAdminNotifs(point, user, admin));

    createPointUserNotif(point);

    console.log("Notifications added to database successfully.");
  },
};
