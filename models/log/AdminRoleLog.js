"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminRoleLog extends Model {
    static createFromAdminRole(AdminRole, action) {
      return this.create({
        role_id: AdminRole.role_id,
        admin_id: AdminRole.admin_id,
        action: action,
      });
    }

    static bulkCreateFromAdminRole(AdminRoles, action) {
      return this.bulkCreate(
        AdminRoles.map((AdminRole) => ({
          role_id: AdminRole.role_id,
          admin_id: AdminRole.admin_id,
          action: action,
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
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      }
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
