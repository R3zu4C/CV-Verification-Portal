const fs = require("fs");
const {
  addPointToDatabase,
  addRequestToDatabase,
  addPointNotifsToDatabase,
  addFlagToDatabase,
  addFlagNotifsToDatabase,
} = require("./helpers/pointHelper");
const path = require("path");

const multer = require('multer');

const multi_upload = require("../middleware/proofUpload");

const { Point, Proof, Flag, sequelize ,User } = require("../models");

module.exports = {
  addPoint: async (req, res) => {
    multi_upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res
          .status(500)
          .send({
            error: { message: `Multer uploading error: ${err.message}` },
          })
          .end();
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == "ExtensionError") {
          res
            .status(413)
            .send({ error: { message: err.message } })
            .end();
        } else {
          res
            .status(500)
            .send({
              error: { message: `unknown uploading error: ${err.message}` },
            })
            .end();
        }
        return;
      }

      const transactionID = await sequelize.transaction();
      try {
        const user_id = req.session.user.user_id;
        const pointData = JSON.parse(`${req.body.point}`);
        const point = await addPointToDatabase(
          pointData,
          user_id,
          transactionID
        );
        if (pointData.org_id) {
          const requests = await addRequestToDatabase(point, transactionID);
          await addPointNotifsToDatabase(point, requests, transactionID);
        }
        for (const _proof of req.files) {
          const proof = await Proof.create(
            {
              proof_link: _proof.filename,
              point_id: point.point_id,
            },
            { transaction: transactionID }
          );
        }
        transactionID.commit();
        res.send({ redirect: "/" });
      } catch (error) {
        console.error("Error:" + error.message);
        transactionID.rollback();
        res.status(400).send("Error in inserting new record");
      }

      res.status(200).end("Your files uploaded.");
    });
  },

  getAllPoint: async (req, res) => {
    try {
      const points = await Point.findAll({
        where: {
          visibility: "P",
          status: "A",
        },
        include: [
          {
            model: Flag,
          },
          {
            model: User,
            as: "User",
            attributes: ["user_id", "name", "roll_no", "branch", "program"],
          },
        ],
      });
      res.send(points);
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in getting all points");
    }
  },

  flagPoint: async (req, res) => {
    const transactionID = await sequelize.transaction();
    try {
      const flagged_by = req.session.user.user_id;
      const point = await Point.findByPk(req.params.pointId, {
        include: [Flag],
      });
      
      if (!point) {
        return res.status(404).send({ error: { message: "Point not found" } });
      } else if (point.status !== "A") {
        return res
          .status(400)
          .send({ error: { message: "Only aprroved points can be flagged" } });
      } else if (point.visibility !== "P") {
        return res
          .status(400)
          .send({ error: { message: "Only public points can be flagged" } });
      }
      let bool = false;
      point.Flags.forEach((flag) => {
        if (flag.flagged_by === flagged_by) bool = true;
      });
      if (bool)
        return res
          .status(400)
          .send({
            error: { message: "You have already flagged this point once" },
          });
      // point.update(
      //   { response_by: null, status: "S" },
      //   { transaction: transactionID }
      // );
      // const requests = await point.getRequests();

      // await Promise.all(
      //   requests.map((request) =>
      //     request.update({ status: "P" }, { transaction: transactionID })
      //   )
      // );

      const flagData = { ...req.body, point_id: point.point_id };

      const flag = await addFlagToDatabase(flagData, flagged_by, transactionID);
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
