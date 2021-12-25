const fs = require("fs");
const {
  addPointToDatabase,
  addRequestToDatabase,
  addPointNotifsToDatabase,
  addFlagToDatabase,
  addFlagNotifsToDatabase,
} = require("./helpers/pointHelper");

const { Point } = require("../models");

module.exports = {
  addPoint: async (req, res) => {
    try {
      const user_id = req.session.userId;
      const point = await addPointToDatabase(req.body, user_id);
      await addRequestToDatabase(point);
      await addPointNotifsToDatabase(point);
      res.send({ redirect: "/", pointId: point.point_id });
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in inserting new record");
    }
  },

  uploadProof: async (req, res) => {
    const fileName = req.headers["file_name"];
    const user_id = req.session.userId;
    const point_id =  req.headers["point_id"];
    const dir = `./uploads/${user_id}`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    req.on("data", (chunk) => fs.appendFileSync(`${dir}/${fileName}`, chunk));

    res.end("Proof uploaded!");
    
    const point = await Point.findByPk(point_id);
    await point.update({proof_link: fileName});
  },

  flagPoint: async (req, res) => {
    try {
      const flagged_by = req.session.userId;
      const point = await Point.findByPk(req.params.pointId);
      point.update({ approved_by: null });
      const requests = await point.getRequests();

      for(const request of requests) {
        await request.update({ approved: 0 });
      }
      const flag = await addFlagToDatabase(req.body, point, flagged_by);
      await addFlagNotifsToDatabase(flag, point);
      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in inserting new record");
    }
  },


};
