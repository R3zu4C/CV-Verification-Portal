"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PermissionLog extends Model {
    static createFromPermission(Permission, action) {
      return this.create({
        perm_id: Permission.perm_id,
        name: Permission.name,
        action: action,
      });
    }

    static bulkCreateFromPermission(Permissions, action) {
      return this.bulkCreate(
        Permissions.map((Permission) => ({
          perm_id: Permission.perm_id,
          name: Permission.name,
          action: action
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  PermissionLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "PermissionLog",
      initialAutoIncrement: 100,
      tableName: "permissions_log",
    }
  );
  return PermissionLog;
};
