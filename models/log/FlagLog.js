"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlagLog extends Model {
    static associate({ AdminLog, UserLog, PointLog, NotificationLog }) {
      this.belongsTo(AdminLog, {
        foreignKey: "approved_by",
        targetKey: "admin_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(UserLog, {
        foreignKey: "flagged_by",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(PointLog, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(NotificationLog, {
        foreignKey: "flag_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    static createFromFlag(Flag, action) {
      return this.create({
        flag_id: Flag.flag_id,
        flagged_by: Flag.flagged_by,
        approved_by: Flag.approved_by,
        point_id: Flag.point_id,
        status: Flag.status,
        action: action,
      });
    }

    static bulkCreateFromFlag(Flags, action) {
      return this.bulkCreate(
        Flags.map((Flag) => ({
          flag_id: Flag.flag_id,
          flagged_by: Flag.flagged_by,
          approved_by: Flag.approved_by,
          point_id: Flag.point_id,
          status: Flag.status,
          action: action
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  FlagLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      flag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        // status can be P(Pending), A(Approved), D(Denied)
        type: DataTypes.CHAR(1),
        defaultValue: "P",
        allowNull: false,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "flags_log",
      modelName: "FlagLog",
      indexes: [{ unique: false, fields: ["flag_id"] }],
    }
  );
  return FlagLog;
};
