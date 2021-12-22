const { Organization } = require("../models");

module.exports = {
  fetchAllOrg: async (req, res) => {
    const orgs = await Organization.findAll();
    res.send(orgs);
  },
};
