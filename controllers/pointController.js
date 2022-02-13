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
  fetchPointById: async (req,res) => {
    if(req.params['pointId']!=null){
      const point = await Point.findByPk(req.params['pointId']);
      res.send(point);
    }
    else {
      res.status(404).send('Error while fetching user');
    }
  },
  addPoint: async (req, res) => {
    console.log(req.body)
    multi_upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == 'ExtensionError') {
          res.status(413).send({ error: { message: err.message } }).end();
          } else {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
          }
        return;
      }
      const transactionID = await sequelize.transaction();
      try {
        const user_id = req.session.user.user_id;
        const pointData = JSON.parse(`${req.body.point}`);
        const point = await addPointToDatabase(pointData, user_id, transactionID);
        const requests = await addRequestToDatabase(point, transactionID);
        await addPointNotifsToDatabase(point, requests, transactionID);
        if(req.files){
          for (const _proof of req.files) {
          const proof = await Proof.create({
            proof_link: _proof.filename,
            point_id: point.point_id,
          }, { transaction: transactionID });
          point.addProof(proof);
        }
      }
        transactionID.commit();
        res.send({ redirect: "/" });
      } catch (error) {
        console.error("Error:" + error.message);
        transactionID.rollback();
        res.status(400).send("Error in inserting new record");
      }
      res.status(200).end('Your files uploaded.');
  })
  },

  

  getAllPoint: async (req, res) => {
    try {
      const points = await Point.findAll({
        // where: {
        //   visibility: 'P',
        // },
        include: [
          {
            model: Flag
          },
          {
            model: User,
            as: "User",
            attributes: ['user_id', 'name', 'roll_no', 'branch', 'program'],
          } 
        ],
      });
      res.send(points);
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in getting all points");
    }
  },

  deletePoint: async (req, res) => {
    try {
      const transactionID = await sequelize.transaction();
      const session_userId = req.session.user.user_id;
      const pointId = req.params.pointId;
      const point = await Point.findByPk(pointId);
      if (!point) {
        return res.status(400).send("Point not found");
      }
      if (point.user_id !== session_userId) {
        return res.status(400).send("You are not authorized to delete this point");
      }

      const requests = await point.getRequests({ where: { status: 'P' } });
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ status: "D" }, { transaction: transactionID })));
      await Promise.all(flags.map(flag => flag.update({ status: "D" }, { transaction: transactionID })));

      await point.update({ status: "D" }, { transaction: transactionID });

      await transactionID.commit();
      res.send("Point deleted");
    } catch (error) {
      await transactionID.rollback();
      console.error("Error:" + error.message);
      res.status(400).send("Error in deleting point");
    }
  },

  getUserPoints: async (req, res) => {
    const user_id = req.session.user.user_id;
    const points = await Point.findAll({
      where: {
        user_id,
      },
      include: [
        Proof, Flag
      ],
    });
    return res.send(points);
  },

  updatePoint: async (req, res) => {
    try {
      const transactionID = await sequelize.transaction();
      const session_userId = req.session.user.user_id;
      const pointId = req.params.pointId;
      const point = await Point.findByPk(pointId);
      const pointData = req.body;
      if (!point) {
        return res.status(400).send({ error: { message: "Point not found" } });
      }
      if (point.user_id !== session_userId) {
        return res.status(400).send({ error: { message: "You are not authorized to update this point" } });
      }
      if (pointData.org_id && pointData.org_id !== point.org_id) {
        return res.status(400).send({ error: { message: "Organization of a point cannot be changed" } });
      }

      const requests = await point.getRequests({ where: { status: 'P' } });
      const flags = await point.getFlags({ where: { response_by: null } });

      await Promise.all(requests.map(_req => _req.update({ status: "D" }, { transaction: transactionID })));
      await Promise.all(flags.map(flag => flag.update({ status: "D" }, { transaction: transactionID })));

      await point.update({
        status: "P",
        visibility: pointData.visibility,
        title: pointData.title,
        description: pointData.description,
      }, {
        transaction: transactionID
      });

      if (point.org_id) {
        const requests = await addRequestToDatabase(point, transactionID);
        await addPointNotifsToDatabase(point, requests, transactionID);
      }

      await transactionID.commit();

      res.send({ error: null, data: point, message: "Point updated successfully" });

    } catch (error) {
      await transactionID.rollback();
      console.error("Error:" + error.message);
      res.status(400).send({ error: { message: "Error in updating point" } });
    }
  }
};
