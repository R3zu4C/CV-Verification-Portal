"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleLog extends Model {
    static createFromRole(Role, action) {
      return this.create({
        role_id: Role.role_id,
        name: Role.name,
        org_id: Role.org_id,
        level: Role.level,
        action: action
      });
    }

    static bulkCreateFromRole(Roles, action) {
      return this.bulkCreate(
        Roles.map((Role) => ({
          role_id: Role.role_id,
          name: Role.name,
          org_id: Role.org_id,
          level: Role.level,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  RoleLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      level: {
        // 0: god admin, 1: admin, 2: noob admin
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      org_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "RoleLog",
      initialAutoIncrement: 100,
      tableName: "roles_log",
    }
  );
  return RoleLog;
};
