const { Point, Admin, User, sequelize } = require("../models");
const fs = require("fs");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.end(fs.readFileSync("./views/index.html"));
});

router.get("/api", async (req, res) => {
  const allPoints = await Point.find({
    where: {
      visibility: "P",
    }
  });

  const userId = req.session.user.user_id;

  const user = await User.findByPk(userId, { include: ["Flags", "Points"] });
  
  const admin = await Admin.findOne({ where: { admin_id: userId } });
  const requests = await admin.getRequests({ where: { approved: 0 }, include: "Point" });

  res.send({ user, allPoints, requests });

})

module.exports = router;
