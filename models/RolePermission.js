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
                afterCreate: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission, 'C'),
                afterUpdate: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission, 'U'),
                beforeDestroy: (rolePermission, options) => RolePermissionLog.createFromRolePermission(rolePermission, 'D'),
                afterBulkCreate: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions, 'C'),
                beforeBulkDestroy: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions, 'D'),
                afterBulkUpdate: (rolePermissions, options) => RolePermissionLog.bulkCreateFromRolePermission(rolePermissions, 'U')
            },

            sequelize,
            modelName: 'RolePermission',
            tableName: "role_permissions",
        }
    );
    return RolePermission;
};
