'use strict';
const { AdminRoleLog } = require('./log');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AdminRole extends Model {
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    AdminRole.init(
        {
        },
        {
            hooks: {
                afterCreate: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole),
                afterUpdate: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole),
                beforeDestroy: (adminRole, options) => AdminRoleLog.createFromAdminRole(adminRole),
                afterBulkCreate: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles),
                afterBulkUpdate: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles),
                beforeBulkDestroy: (adminRoles, options) => AdminRoleLog.bulkCreateFromAdminRole(adminRoles),
            },
            sequelize,
            modelName: 'AdminRole',
            tableName: "admin_roles",
        }
    );
    return AdminRole;
};
