"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermissionLog extends Model {
    static createFromRolePermission(RolePermission) {
      return this.create({
        role_id: RolePermission.role_id,
        perm_id: RolePermission.perm_id,
      });
    }

    static bulkCreateFromRolePermission(RolePermissions) {
      return this.bulkCreate(
        RolePermissions.map((RolePermission) => ({
          role_id: RolePermission.role_id,
          perm_id: RolePermission.perm_id,
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
