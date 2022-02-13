const { Admin, Request, Remark, sequelize } = require("../models");
const AdminService = require("./helpers/adminHelper")

module.exports = {
  allPendingRequests: async (req, res) => {
    const userId = req.session.user.user_id;
    const admin = await Admin.findOne({ where:{ admin_id: userId }});
    const requests = await admin.getRequests({ where: { status: 'P' },
     include: ["Point", "User"]
    });
    res.send(requests);
  },

  allApprovedRequests: async (req,res) => {
    const userId = req.session.user.user_id;
    const admin = await Admin.findOne({where: {admin_id: userId}});
    const requests = await admin.getRequests({ where: {status: 'A'}, include:["Point", "User"]}); 
    res.send(requests);
  },

  respondToRequest: async (req, res, status) => {
    const transactionID = await sequelize.transaction();
    try {
      const responseBy = req.session.user.user_id;
      const reqId = req.params.reqId;

      const request = await Request.findByPk(reqId);
      if (!request) {
        return res.status(404).send({error: {message: "Request not found"}});
      }
      if (request.status !== 'P') {
        return res.status(400).send({error: {message: "Request has already been responded to"}});
      }
      const point = await request.getPoint();
      const adminService = new AdminService(req.session.user, req.session.admin);
      if (adminService.hasPermission("Approve requests", point.org_id) === false)
        return res.status(403).send({ error: "You do not have permission to respond to this request" });

      if (status === "S") {
        if(!req.body.suggestion)
          return res.status(400).send({error: {message: "Suggestion cannot be empty"}});

        const remarks = await point.getRemarks();
        await remarks.map((remark) => {
          remark.update({
            active: false
          }, { transaction: transactionID });
        });
        
        await Remark.create({
          remark: req.body.suggestion,
          point_id: point.point_id,
          from: responseBy,
          active: true,
        }, {transaction: transactionID});
      }

      const requests = await point.getRequests({where : {status: 'P'}});
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ status: "D" }, { transaction: transactionID })));

      await Promise.all(flags.map(flag => flag.update({ response_by: responseBy, status: status }, { transaction: transactionID })));

      await point.update({ response_by: responseBy, status: status }, { transaction: transactionID });

      if (req.body.remark)
        await request.update({ remark: req.body.remark , status: status}, { transaction: transactionID });
      
      transactionID.commit();

      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);

      transactionID.rollback();

      res.status(500).send({ error, redirect: "/" });
    }
  },
}