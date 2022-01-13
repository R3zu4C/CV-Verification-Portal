"use strict";
const { AdminRoleLog } = require("./log");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminRole extends Model {
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  AdminRole.init(
    {},
    {
      hooks: {
        afterCreate: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole, "C"),
        afterUpdate: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole, "U"),
        beforeDestroy: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole, "D"),
        afterBulkCreate: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles, "C"),
        afterBulkUpdate: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles, "U"),
        beforeBulkDestroy: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles, "D"),
      },
      sequelize,
      modelName: "AdminRole",
      tableName: "admin_roles",
    }
  );
  return AdminRole;
};
