const { Admin, Request, sequelize } = require("../models");
const AdminService = require("./helpers/adminHelper")

module.exports = {
  allPendingRequests: async (req, res) => {
    const userId = req.session.user.user_id;
    const admin = await Admin.findOne({ where: { admin_id: userId } });
    const requests = await admin.getRequests({ where: { approved: 'P' }, include: "Point" });
    res.send(requests);
  },

  respondToRequest: async (req, res, status) => {
    const transactionID = await sequelize.transaction();
    try {
      const responseBy = req.session.user.user_id;
      const reqId = req.params.reqId;

      const request = await Request.findByPk(reqId);
      const point = await request.getPoint();

      const adminService = new AdminService(req.session.user, req.session.admin);
      if (adminService.hasPermission("Approve requests", point.org_id) === false)
        return res.status(403).send({ error: "You do not have permission to respond to this request" });

      const requests = await point.getRequests();
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ approved: status }, { transaction: transactionID })));

      await Promise.all(flags.map(flag => flag.update({ response_by: responseBy, status: status }, { transaction: transactionID })));

      await point.update({ response_by: responseBy, status: status }, { transaction: transactionID });

      if (req.body.remark)
        await request.update({ remark: req.body.remark }, { transaction: transactionID });

      transactionID.commit();

      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);

      transactionID.rollback();

      res.status(500).send({ error, redirect: "/" });
    }
  },
}