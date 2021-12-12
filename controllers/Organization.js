const Organization = require('../models/Organization');

module.exports.fetchAllOrg = async (req, res) => {
    const orgs = await Organization.findAll();
    res.send(orgs);
}