"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermissionLog extends Model {
    static createFromRolePermission(RolePermission , action) {
      return this.create({
        role_id: RolePermission.role_id,
        perm_id: RolePermission.perm_id,
        action: action,
      });
    }

    static bulkCreateFromRolePermission(RolePermissions, action) {
      return this.bulkCreate(
        RolePermissions.map((RolePermission) => ({
          role_id: RolePermission.role_id,
          perm_id: RolePermission.perm_id,
          action: action
        }))
      );
    }
  }
  RolePermissionLog.init(
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
    },
    {
      sequelize,
      modelName: "RolePermissionLog",
      initialAutoIncrement: 100,
      tableName: "role_permission_log",
    }
  );
  return RolePermissionLog;
};
