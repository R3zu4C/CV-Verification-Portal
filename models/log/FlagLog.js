"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlagLog extends Model {
    static createFromFlag(Flag, action) {
      return this.create({
        flag_id: Flag.flag_id,
        flagged_by: Flag.flagged_by,
        response_by: Flag.response_by,
        point_id: Flag.point_id,
        description: Flag.description,
        status: Flag.status,
        action: action,
      });
    }

    static bulkCreateFromFlag(Flags, action) {
      return this.bulkCreate(
        Flags.map((Flag) => ({
          flag_id: Flag.flag_id,
          flagged_by: Flag.flagged_by,
          response_by: Flag.response_by,
          point_id: Flag.point_id,
          description: Flag.description,
          status: Flag.status,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  FlagLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      flag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        // status can be P(Pending), A(Approved), D(Denied)
        type: DataTypes.CHAR(1),
        defaultValue: "P",
        allowNull: false,
      },
      flagged_by: {
        type: DataTypes.STRING(50),
      },
      response_by: {
        type: DataTypes.STRING(50),
      },
      point_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "flags_log",
      modelName: "FlagLog",
    }
  );
  return FlagLog;
};
