'use strict';
const { Model } = require('sequelize');
const {PermissionLog} = require('./log');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate({ Admin, Role , AdminPermission, RolePermission}) {

      this.belongsToMany(Admin, {
        through: AdminPermission,
        foreignKey: "perm_id",
        sourceKey: "perm_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Role, {
        through: RolePermission,
        foreignKey: "perm_id",
        sourceKey: "perm_id",
        otherKey: "role_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Permission.init(
    {
      perm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      hooks: {
        afterBulkCreate: (perms, options) => PermissionLog.bulkCreateFromPermission(perms, 'C'),
        beforeBulkDestroy: (perms, options) => PermissionLog.bulkCreateFromPermission(perms, 'D'),
        afterBulkUpdate: (perms, options) => PermissionLog.bulkCreateFromPermission(perms, 'U'),
        afterCreate: (perm, options) => PermissionLog.createFromPermission(perm, 'C'),
        afterUpdate: (perm, options) => PermissionLog.createFromPermission(perm, 'U'),
        beforeDestroy: (perm, options) => PermissionLog.createFromPermission(perm, 'D'),
      },
      
      sequelize,
      modelName: 'Permission',
      initialAutoIncrement: 100,
      tableName: "permissions",
    }
  );
  return Permission;
};
