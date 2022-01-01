'use strict';
const { Model } = require('sequelize');
const {RoleLog} = require("./log");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ Admin, Permission, Organization, AdminRole, RolePermission }) {
      
      this.belongsTo(Organization, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Permission, {
        through: RolePermission,
        foreignKey: "role_id",
        otherKey: "perm_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Admin, {
        through: AdminRole,
        foreignKey: "role_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      level: {
        // 0: god admin, 1: admin, 2: noob admin
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterBulkCreate: (roles, options) => RoleLog.bulkCreateFromRole(roles),
        beforeBulkDestroy: (roles, options) => RoleLog.bulkCreateFromRole(roles),
        afterBulkUpdate: (roles, options) => RoleLog.bulkCreateFromRole(roles),
        afterCreate: (role, options) => RoleLog.createFromRole(role),
        afterUpdate: (role, options) => RoleLog.createFromRole(role),
        beforeDestroy: (role, options) => RoleLog.createFromRole(role),
      },
      
      sequelize,
      modelName: 'Role',
      initialAutoIncrement: 100,
      tableName: "roles",
    }
  );
  return Role;
};
