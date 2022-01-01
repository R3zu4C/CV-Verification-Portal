"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminPermissionLog extends Model {
    static associate({ OrganizationLog }) {
      this.belongsTo(OrganizationLog, {
        foreignKey: "org_id",
        targetKey: "org_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

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
      modelName: "AdminPermissionLog",
      initialAutoIncrement: 100,
      tableName: "admin_permissions_log",
    }
  );
  return AdminPermissionLog;
};
