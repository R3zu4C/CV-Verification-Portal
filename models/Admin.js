"use strict";
const { Model } = require("sequelize");
const { AdminLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate({
      User,
      Permission,
      Role,
      Flag,
      Request,
      Point,
      AdminPermission,
      AdminRole,
    }) {
      this.belongsTo(User, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsToMany(Permission, {
        through: AdminPermission,
        foreignKey: "admin_id",
        sourceKey: "admin_id",
        otherKey: "perm_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsToMany(Role, {
        through: AdminRole,
        foreignKey: "admin_id",
        sourceKey: "admin_id",
        otherKey: "role_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(Flag, {
        foreignKey: "approved_by",
        sourceKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(Point, {
        foreignKey: "approved_by",
        sourceKey: "admin_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(Request, {
        foreignKey: "req_to",
        sourceKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Admin.init(
    {
      admin_id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
    },
    {
      hooks: {
        afterBulkCreate: (admins, options) => AdminLog.bulkCreateFromAdmin(admins, "C"),
        beforeBulkDestroy: (admins, options) => AdminLog.bulkCreateFromAdmin(admins, "D"),
        afterBulkUpdate: (admins, options) => AdminLog.bulkCreateFromAdmin(admins, "U"),
        afterCreate: (admin, options) => AdminLog.createFromAdmin(admin, "C"),
        beforeDestroy: (admin, options) => AdminLog.createFromAdmin(admin, "D"),
        afterUpdate: (admin, options) => AdminLog.createFromAdmin(admin, "U"),
      },
      sequelize,
      initialAutoIncrement: 100,
      tableName: "admins",
      modelName: "Admin",
    }
  );
  return Admin;
};
