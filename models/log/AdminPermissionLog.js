"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminPermissionLog extends Model {
    static createFromAdminPermission(AdminPermission, action) {
      return this.create({
        admin_id: AdminPermission.admin_id,
        perm_id: AdminPermission.perm_id,
        org_id: AdminPermission.org_id,
        action: action,
      });
    }

    static bulkCreateFromAdminPermission(AdminPermissions, action) {
      return this.bulkCreate(
        AdminPermissions.map((AdminPermission) => ({
          admin_id: AdminPermission.admin_id,
          perm_id: AdminPermission.perm_id,
          org_id: AdminPermission.org_id,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  AdminPermissionLog.init(
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
      perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AdminPermissionLog",
      initialAutoIncrement: 100,
      tableName: "admin_permissions_log",
    }
  );
  return AdminPermissionLog;
};
