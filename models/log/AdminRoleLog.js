"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminRoleLog extends Model {
    static createFromAdminRole(AdminRole) {
      return this.create({
        role_id: AdminRole.role_id,
        admin_id: AdminRole.admin_id,
      });
    }

    static bulkCreateFromAdminRole(AdminRoles) {
      return this.bulkCreate(
        AdminRoles.map((AdminRole) => ({
          role_id: AdminRole.role_id,
          admin_id: AdminRole.admin_id,
        }))
      );
    }
  }
  AdminRoleLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "AdminRoleLog",
      initialAutoIncrement: 100,
      tableName: "admin_roles_log",
    }
  );
  return AdminRoleLog;
};
