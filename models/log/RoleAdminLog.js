'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RoleAdminLog extends Model {

        static createFromRoleAdmin(RoleAdmin) {
            return this.create({
                role_id: RoleAdmin.role_id,
                admin_id: RoleAdmin.admin_id,
            })
        }

        static bulkCreateFromRoleAdmin(RoleAdmins) {
            return this.bulkCreate(RoleAdmins.map(RoleAdmin => ({
                role_id: RoleAdmin.role_id,
                admin_id: RoleAdmin.admin_id,
            })))
        }
    }
    RoleAdminLog.init(
        {
            logId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            sequelize,
            modelName: 'RoleAdminLog',
            initialAutoIncrement: 100,
            tableName: "role_admin_log",
        }
    );
    return RoleAdminLog;
};
