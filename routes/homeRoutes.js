const {requireAuth } = require("../middleware/authMiddleware")
const { Point, Admin, User, Flag, sequelize } = require("../models");
const fs = require("fs");
const AdminService = require("../controllers/helpers/adminHelper");
const { Op } = require("sequelize");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.end(fs.readFileSync("./views/index.html"));
});

router.get("/api", async (req, res) => {
  try {
    const allPoints = await Point.findAll({
      where: {
        visibility: "P",
      }
    });

    const user_id = req.session.user.user_id;

    const user = await User.findByPk(user_id, { include: ["Flags", "Points"] });

    const admin = await Admin.findOne({ where: { admin_id: user_id } });
    const requests = await admin.getRequests({ include: "Point" });

    const subQuery = `SELECT point_id FROM points WHERE user_id = '${req.session.user.user_id}'`;
    const flagsOfUsers = await Flag.findAll({
      where: {
        point_id: [sequelize.literal(subQuery)],
      },
      include: ["Point"],
    });

    const respondedFlagsOfAdmin = await Flag.findAll({
      where: {
        response_by: user_id,
      },
      include: [{
        model: Point,
        include: [{ model: User, as: "User" }]
      }],
    })

    const adminService = new AdminService(req.session.user, req.session.admin);
    let adminOrg = adminService.org
    adminOrg = Object.keys(adminOrg).map(org => parseInt(org))
    adminOrg = adminOrg.filter(org => org !== 0)
    const orgSubQuery = `SELECT point_id FROM points WHERE org_id IN (${adminOrg.join(",")})`;
    console.log(orgSubQuery)
    const pendingFlagsOfAdmin = await Flag.findAll({
      where: {
        point_id: [sequelize.literal(orgSubQuery)],
        response_by: { [Op.eq]: null }
      },
      include: [{
        model: Point,
        include: [{model: User, as: "User"}]
      }],
    })

    return res.send({ user, allPoints, requests, flagsOfUsers, respondedFlagsOfAdmin, pendingFlagsOfAdmin });
  } catch (err) {
    res.status(500).send({
      err,
    });
  }
})

module.exports = router;
