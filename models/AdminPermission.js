'use strict';
const {AdminPermissionLog} = require('./log')
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AdminPermission extends Model {
        static associate({ Organization }) {
            this.belongsTo(Organization, {
                foreignKey: "org_id",
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });
        }

        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    AdminPermission.init(
        {
        },
        {
            hooks:{
                afterCreate: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission),
                afterUpdate: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission),
                beforeDestroy: (adminPermission, options) => AdminPermissionLog.createFromAdminPermission(adminPermission),
                afterBulkCreate: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions),
                afterBulkUpdate: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions),
                beforeBulkDestroy: (adminPermissions, options) => AdminPermissionLog.bulkCreateFromAdminPermission(adminPermissions),
            },
            sequelize,
            modelName: 'AdminPermission',
            // initialAutoIncrement: 100,
            tableName: "admin_permissions",
        }
    );
    return AdminPermission;
};
