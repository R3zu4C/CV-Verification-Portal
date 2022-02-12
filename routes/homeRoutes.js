const { Point, Admin, User, Flag, sequelize } = require("../models");
const fs = require("fs");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.end(fs.readFileSync("./views/index.html"));
});

router.get("/api", async (req, res) => {
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

  const flagsOfAdmins = await Flag.findAll({
    where: {
      response_by: user_id,
    },
    include: ["Point"],
  })

  res.send({ user, allPoints, requests, flagsOfUsers, flagsOfAdmins });

})

module.exports = router;
