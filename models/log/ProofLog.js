"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProofLog extends Model {
    static createFromProof(Proof, action) {
      return this.create({
        proof_id: Proof.proof_id,
        proof_link: Proof.proof_link,
        action: action,
      });
    }

    static bulkCreateFromProof(Proofs, action) {
      return this.bulkCreate(
        Proofs.map((Proof) => ({
          proof_id: Proof.proof_id,
          proof_link: Proof.proof_link,
          action: action,
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
      point_id: {
        type: DataTypes.INTEGER,
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
