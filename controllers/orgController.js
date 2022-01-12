const { Organization } = require("../models");

module.exports = {
  fetchAllOrg: async (req, res) => {
    const orgs = await Organization.findAll();
    res.send(orgs);
  },

  createOrg: async (req, res) => {
    try {
      const { org_id, name, parent_id } = req.body;
      const org = await Organization.create({ org_id, name });

      if (parent_id) {
        await org.setOrganization(parent_id);
      }

      res.send(org);
    }
    catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  getOrgWithChildren: async (req, res) => {
    try {
      const { org_id } = req.params;
      const org = await Organization.findByPk(org_id, {
        include: [
            Organization,
        ],
      });
      res.send(org);
    }
    catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  getOrgsWithChildren: async (req, res) => {
    try {
      const orgs = await Organization.findAll({
        include: [
          Organization,
        ],
      });
      res.send(orgs);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  },

  updateOrg: async (req, res) => {
    try {
      const { org_id, parent_id, name } = req.body;
      const org = await Organization.findByPk(org_id);

      if (name) await org.update({ name });

      if (parent_id) await org.setOrganization(parent_id);
      res.send(org);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  },

  deleteOrg: async (req, res) => {
    try {
      const { org_id } = req.body;
      const org = await Organization.findByPk(org_id);
      await org.destroy();
      res.send(org);
    }
    catch (err) {
      console.error(err);
      res.send(err);
    }
  },


};
