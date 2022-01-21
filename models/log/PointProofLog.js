"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointProofLog extends Model {
    static createFromPointProof(pointProof, action) {
      return this.create({
        point_id: pointProof.point_id,
        proof_id: pointProof.proof_id,
        action: action,
      });
    }

    static bulkCreateFromPointProof(pointProofs, action) {
      return this.bulkCreate(
        pointProofs.map((pointProof) => ({
          point_id: pointProof.point_id,
          proof_id: pointProof.proof_id,
          action: action,
        }))
      );
    }
  }
  PointProofLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      point_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      proof_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "PointProofLog",
      initialAutoIncrement: 100,
      tableName: "point_proofs_log",
    }
  );
  return PointProofLog;
};
