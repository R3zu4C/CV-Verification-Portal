'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionLog extends Model {
    static associate({ AdminLog, RoleLog, AdminPermissionLog, RolePermissionLog }) {

      this.belongsToMany(AdminLog, {
        through: AdminPermissionLog,
        foreignKey: "perm_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(RoleLog, {
        through: RolePermissionLog,
        foreignKey: "perm_id",
        otherKey: "role_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    }

    static createFromPermission(Permission) {
      return this.create({
        perm_id: Permission.perm_id,
        name: Permission.name,
      })
    }

    static bulkCreateFromPermission(Permissions) {
      return this.bulkCreate(Permissions.map(Permission => ({
        perm_id: Permission.perm_id,
        name: Permission.name,
      })));
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  PermissionLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: 'PermissionLog',
      initialAutoIncrement: 100,
      tableName: "permissions_log",
    }
  );
  return PermissionLog;
};
