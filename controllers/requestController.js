const { Admin, Request } = require("../models");

module.exports = {
  allPendingRequests: async (req, res) => {
    const userId = req.session.user.user_id;
    const admin = await Admin.findOne({ where: { admin_id: userId }});
    const requests = await admin.getRequests({ where: { approved: 0 }, include: "Point" });
    res.send(requests);
  },

  approveRequest: async (req, res) => {
    const approvedBy = req.session.user.user_id;
    const reqId = req.params.reqId;

    const request = await Request.findByPk(reqId);
    const point = await request.getPoint();
    const requests = await point.getRequests();
    const flags = await point.getFlags({ where: { approved_by: null }});

    await Promise.all(requests.map(_req => _req.update({ approved: 1 })));

    await Promise.all(flags.map(flag => flag.update({ approved_by: approvedBy })));
    
    await point.update({ approved_by: approvedBy , status : 'A'});

    res.send({ redirect: "/" });
  },
}