const fs = require("fs");
const {
  addPointToDatabase,
  addRequestToDatabase,
  addPointNotifsToDatabase,
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
};
