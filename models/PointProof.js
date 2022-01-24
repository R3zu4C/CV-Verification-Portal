"use strict";
const { PointProofLog } = require("./log");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointProof extends Model {
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  PointProof.init(
    {},
    {
      hooks: {
        afterCreate: (pointProof, options) => PointProofLog.createFromPointProof(pointProof, "C"),
        afterUpdate: (pointProof, options) => PointProofLog.createFromPointProof(pointProof, "U"),
        beforeDestroy: (pointProof, options) => PointProofLog.createFromPointProof(pointProof, "D"),
        afterBulkCreate: (pointProofs, options) => PointProofLog.bulkCreateFromPointProof(pointProofs, "C"),
        afterBulkUpdate: (pointProofs, options) => PointProofLog.bulkCreateFromPointProof(pointProofs, "U"),
        beforeBulkDestroy: (pointProofs, options) => PointProofLog.bulkCreateFromPointProof(pointProofs, "D"),
      },
      sequelize,
      modelName: "PointProof",
      tableName: "point_proofs",
    }
  );
  return PointProof;
};
