const fs = require("fs");
const {
  addPointToDatabase,
  addRequestToDatabase,
  addPointNotifsToDatabase,
  addFlagToDatabase,
  addFlagNotifsToDatabase,
} = require("./helpers/pointHelper");

const { Point, Proof, Flag, sequelize } = require("../models");

module.exports = {
  addPoint: async (req, res) => {
    const transactionID = await sequelize.transaction();
    try {
      const user_id = req.session.user.user_id;
      const point = await addPointToDatabase(req.body, user_id, transactionID);
      const requests = await addRequestToDatabase(point, transactionID);
      await addPointNotifsToDatabase(point, requests, transactionID);
      transactionID.commit();
      res.send({ redirect: "/", pointId: point.point_id });
    } catch (error) {
      console.error("Error:" + error.message);
      transactionID.rollback();
      res.status(400).send("Error in inserting new record");
    }
  },

  getAllPoint: async (req, res) => {
    try {
      const points = await Point.findAll({
        where: {
          visibility: 'P',
        },
        include: [
          Flag
        ],
      });
      res.send(points);
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in getting all points");
    }
  },

  uploadProof: async (req, res) => {
    const fileName = req.headers["file_name"];
    const user_id = req.session.user.roll_no;
    const point_id = req.headers["point_id"];
    const dir = `./public/proofs/${user_id}`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    req.on("data", (chunk) => fs.appendFileSync(`${dir}/${fileName}`, chunk));

    res.end("Proof uploaded!");

    const point = await Point.findByPk(point_id);
    const proof = await Proof.create({
      proof_link: fileName,
      point_id: point.point_id,
    });
    point.addProof(proof);
  },

  flagPoint: async (req, res) => {
    const transactionID = await sequelize.transaction();
    try {
      const flagged_by = req.session.user.user_id;
      const point = await Point.findByPk(req.params.pointId);
      point.update({ approved_by: null, status: 'F' }, { transaction: transactionID });
      const requests = await point.getRequests();

      await Promise.all(requests.map(request => request.update({ approved: 0 }, { transaction: transactionID })));

      const flag = await addFlagToDatabase(req.body, flagged_by, transactionID);
      await addFlagNotifsToDatabase(flag, point, transactionID);
      transactionID.commit();
      res.send({ redirect: "/" });
    } catch (error) {
      console.error("Error:" + error.message);
      transactionID.rollback();
      res.status(400).send("Error in inserting new record");
    }
  },


};
