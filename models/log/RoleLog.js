'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleLog extends Model {
    static associate({ AdminLog, PermissionLog, OrganizationLog, RoleAdminLog, RolePermissionLog }) {
      
      this.belongsTo(OrganizationLog, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(PermissionLog, {
        through: RolePermissionLog,
        foreignKey: "role_id",
        otherKey: "perm_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(AdminLog, {
        through: RoleAdminLog,
        foreignKey: "role_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    static createFromRole(Role) {
      return this.create({
        role_id: Role.role_id,
        name: Role.name,
        org_id: Role.org_id,
        level: Role.level,
      })
    }

    static bulkCreateFromRole(Roles) {
      return this.bulkCreate(Roles.map(Role => ({
        role_id: Role.role_id,
        name: Role.name,
        org_id: Role.org_id,
        level: Role.level,
      })));
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  RoleLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      sequelize,
      modelName: 'RoleLog',
      initialAutoIncrement: 100,
      tableName: "roles_log",
    }
  );
  return RoleLog;
};
