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
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
