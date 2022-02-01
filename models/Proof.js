"use strict";
const { Model } = require("sequelize");
const { ProofLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
  class Proof extends Model {
    static associate({ Point }) {
      this.belongsTo(Point, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Proof.init(
    {
      proof_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      proof_link: {
        type: DataTypes.STRING(255),
      },

    },
    {
      hooks: {
        // afterBulkCreate: (proofs, options) => ProofLog.bulkCreateFromProof(proofs, "C"),
        // beforeBulkDestroy: (proofs, options) => ProofLog.bulkCreateFromProof(proofs, "D"),
        // afterBulkUpdate: (proofs, options) => ProofLog.bulkCreateFromProof(proofs, "U"),
        // afterCreate: (proof, options) => ProofLog.createFromProof(proof, "C"),
        // beforeDestroy: (proof, options) => ProofLog.createFromProof(proof, "D"),
        // afterUpdate: (proof, options) => ProofLog.createFromProof(proof, "U"),
      },
      sequelize,
      initialAutoIncrement: 100,
      tableName: "proofs",
      modelName: "Proof",
    }
  );
  return Proof;
};
