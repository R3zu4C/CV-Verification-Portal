"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminLog extends Model {
    static createFromAdmin(Admin, action) {
      return this.create({
        _id: Admin._id,
        admin_id: Admin.admin_id,
        action: action,
      });
    }

    static bulkCreateFromAdmin(Admins, action) {
      return this.bulkCreate(
        Admins.map((Admin) => ({
          _id: Admin._id,
          admin_id: Admin.admin_id,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  AdminLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "admins_log",
      modelName: "AdminLog",
    }
  );
  return AdminLog;
};
