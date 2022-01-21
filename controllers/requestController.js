const { Admin, Request , sequelize } = require("../models");
const AdminService = require("./helpers/adminHelper")

module.exports = {
  allPendingRequests: async (req, res) => {
    const userId = req.session.user.user_id;
    const admin = await Admin.findOne({ where: { admin_id: userId } });
    const requests = await admin.getRequests({ where: { approved: 0 }, include: "Point" });
    res.send(requests);
  },

  approveRequest: async (req, res) => {
    const transactionID = await sequelize.transaction();
    try {
      const approvedBy = req.session.user.user_id;
      const reqId = req.params.reqId;

      const request = await Request.findByPk(reqId);
      const point = await request.getPoint();

      const adminService = new AdminService(req.session.user, req.session.admin);
      if (adminService.hasPermission("Approve requests", point.org_id) === false)
        return res.status(403).send({ error: "You do not have permission to approve this request" });

      const requests = await point.getRequests();
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ approved: 1 }, { transaction: transactionID })));

      await Promise.all(flags.map(flag => flag.update({ response_by: approvedBy, status: "A" }, { transaction: transactionID })));

      await point.update({ response_by: approvedBy, status: 'A' }, { transaction: transactionID });

      transactionID.commit();

      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);

      transactionID.rollback();
      
      res.status(500).send({ error, redirect: "/" });
    }
  },

  rejectRequest: async (req, res) => {
    const transactionID = await sequelize.transaction();
    try {
      const rejectedBy = req.session.user.user_id;
      const reqId = req.params.reqId;

      const request = await Request.findByPk(reqId);
      const point = await request.getPoint();

      const adminService = new AdminService(req.session.user, req.session.admin);
      if (adminService.hasPermission("Approve requests", point.org_id) === false)
        return res.status(403).send({ error: "You do not have permission to approve this request" });

      const requests = await point.getRequests();
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ approved: 1 }, { transaction: transactionID })));

      await Promise.all(flags.map(flag => flag.update({ response_by: rejectedBy, status: "A" }, { transaction: transactionID })));

      await point.update({ response_by: rejectedBy, status: 'D' }, { transaction: transactionID });

      transactionID.commit();

      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);

      transactionID.rollback();
      
      res.status(500).send({ error, redirect: "/" });
    }
  },
}