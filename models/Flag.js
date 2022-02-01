"use strict";
const { Model } = require("sequelize");
const { FlagLog } = require("./log");
module.exports = (sequelize, DataTypes) => {
  class Flag extends Model {
    static associate({ Admin, User, Point, Notification }) {
      this.belongsTo(Admin, {
        foreignKey: "response_by",
        targetKey: "admin_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(User, {
        foreignKey: "flagged_by",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Point, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(Notification, {
        foreignKey: "flag_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Flag.init(
    {
      flag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    {
      hooks: {
        afterCreate: (flag, options) => FlagLog.createFromFlag(flag, "C"),
        afterUpdate: (flag, options) => FlagLog.createFromFlag(flag, "U"),
        beforeDestroy: (flag, options) => FlagLog.createFromFlag(flag, "D"),
        afterBulkCreate: (flags, options) => FlagLog.bulkCreateFromFlag(flags, "C"),
        afterBulkUpdate: (flags, options) => FlagLog.bulkCreateFromFlag(flags, "U"),
        beforeBulkDestroy: (flags, options) => FlagLog.bulkCreateFromFlag(flags, "D"),
      },
      sequelize,
      initialAutoIncrement: 100,
      tableName: "flags",
      modelName: "Flag",
    }
  );
  return Flag;
};
