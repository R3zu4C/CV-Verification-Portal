"use strict";
const { AdminPermissionLog } = require("./log");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminPermission extends Model {
    static associate({ Organization }) {
      this.belongsTo(Organization, {
        foreignKey: "org_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  AdminPermission.init(
    {},
    {
      hooks: {
        afterCreate: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission, "C"),
        afterUpdate: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission, "U"),
        beforeDestroy: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission, "D"),
        afterBulkCreate: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions, "C"),
        afterBulkUpdate: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions, "U"),
        beforeBulkDestroy: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions, "D"),
      },
      sequelize,
      modelName: "AdminPermission",
      tableName: "admin_permissions",
    }
  );
  return AdminPermission;
};
