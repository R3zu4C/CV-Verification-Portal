"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProofLog extends Model {
    static createFromProof(proof, action) {
      return this.create({
        proof_id: proof.proof_id,
        proof_link: proof.proof_link,
      });
    }

    static bulkCreateFromProof(proofs, action) {
      return this.bulkCreate(
        proofs.map((proof) => ({
          proof_id: proof.proof_id,
          proof_link: proof.proof_link,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  ProofLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      proof_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      proof_link: {
        type: DataTypes.STRING(255),
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      }
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "proofs_log",
      modelName: "ProofLog",
    }
  );
  return ProofLog;
};
