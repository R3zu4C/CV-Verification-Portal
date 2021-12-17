const Point = require("../models/Point");
const Organization = require("../models/Organization");
const Request = require("../models/Request");
const fs = require("fs");
const Role = require("../models/Role");
const AdminToRole = require("../models/AdminToRole");
const { Op } = require("sequelize");

module.exports.addPoint = async (req, res) => {
  try {
    const p = await Point.create({
      title: req.body.title,
      description: req.body.description,
      s_id: parseInt(req.body.s_id),
      category: req.body.category,
      org_id: parseInt(req.body.org_id),
      added_by: parseInt(req.body.added_by),
      status: 'P',
      visibility: 'P',
      proof: req.body.proof,
    });
    if (p) {
      res.send(p);
      console.log("Point added to database successfully.");
      console.log(JSON.stringify(p));
      const roles = await Role.findAll({
        where: {
          org_id: p.org_id
        }
      });
      let role_ids = [];
      roles.forEach(role => {
        role_ids.push(role.role_id);
      });
      const req_to = await AdminToRole.findAll({
        where: {
          role_id: {
            [Op.in]: role_ids
          }
        }
      });
      req_to.forEach(async (admin) => {
        const request = await Request.create({
          type: p.category,
          point_id: p.point_id,
          req_by: p.added_by,
          req_to: admin.s_id,
        });
        console.log(JSON.stringify(request));
        
      });
      console.log("Request added to database successfully.");
    }
  } catch (error) {
    console.error("Error:" + error.message);
    res.status(400).send("Error in inserting new record");
  }
};

module.exports.uploadProof = async (req, res) => {
  const fileName = req.headers["file-name"];
  const s_id = req.headers["s_id"];
  var dir = `./uploads/${s_id}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  req.on("data", (chunk) => {
    fs.appendFileSync(`${dir}/${fileName}`, chunk);
  });
  res.end("uploaded!");
};
