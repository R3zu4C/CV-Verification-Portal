'use strict';
const { Model } = require('sequelize');
const { RolePermissionLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    RolePermission.init(
        {
        },
        {
            hooks: {
                afterCreate: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission),
                afterUpdate: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission),
                beforeDestroy: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission),
                afterBulkCreate: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions),
                beforeBulkDestroy: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions),
                afterBulkUpdate: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions)
            },

            sequelize,
            modelName: 'RolePermission',
            tableName: "role_permissions",
        }
    );
    return RolePermission;
};
