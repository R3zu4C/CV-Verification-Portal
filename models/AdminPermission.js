'use strict';
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
            // timePass: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'AdminPermission',
            // initialAutoIncrement: 100,
            tableName: "admin_permissions",
        }
    );
    return AdminPermission;
};
