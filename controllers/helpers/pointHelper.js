const {
  AdminToRole,
  Notification,
  Point,
  Request,
  Role,
  User,
} = require("../../models/index");
const { Op } = require("sequelize");

const getRoleIds = async (point) => {
  const roleIds = [];
  const roles = await Role.findAll({ where: { org_id: point.org_id } });
  roles.forEach((role) => roleIds.push(role.role_id));

  return roleIds;
};

const createPoint = async (pointData) => {
  const point = await Point.create({
    title: pointData.title,
    description: pointData.description,
    s_id: pointData.s_id,
    category: pointData.category,
    org_id: parseInt(pointData.org_id),
    added_by: pointData.added_by,
    status: "P",
    visibility: "P",
    proof: pointData.proof,
  });

  return point;
};

const createRequest = async (pointData, adminData) => {
  await Request.create({
    type: pointData.category,
    point_id: pointData.point_id,
    req_by: pointData.added_by,
    req_to: adminData.s_id,
  });
};

const createPointAdminNotifs = async (pointData, userData, adminData) => {
  await Notification.create({
    type: "R",
    description: `${userData.name} has requested you to add ${pointData.category}`,
    title: `${pointData.category} Request`,
    notif_to: adminData.s_id,
    user_type: "A",
  });
};

const createPointUserNotif = async (pointData) => {
  await Notification.create({
    type: "P",
    description: `You have requested to add ${pointData.category}`,
    title: `${pointData.category} Request`,
    notif_to: pointData.s_id,
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
    const roleIds = await getRoleIds(point);

    const requestTo = await AdminToRole.findAll({
      where: { role_id: { [Op.in]: roleIds } },
    });

    requestTo.forEach(async (admin) => await createRequest(point, admin));

    console.log("Requests added to database successfully.");
  },

  addPointNotifsToDatabase: async (point) => {
    const roleIds = await getRoleIds(point);
    const user = await User.findByPk(parseInt(point.s_id));

    const requestTo = await AdminToRole.findAll({
      where: { role_id: { [Op.in]: roleIds } },
    });

    requestTo.forEach(
      async (admin) => await createPointAdminNotifs(point, user, admin)
    );

    createPointUserNotif(point);

    console.log("Notifications added to database successfully.");
  },
};
