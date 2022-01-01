'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AdminLog extends Model {

    static associate({ UserLog, PermissionLog, RoleLog, FlagLog, RequestLog, PointLog, AdminPermissionLog, RoleAdminLog }) {

      this.belongsTo(UserLog, {
        foreignKey: "admin_id",
        targetKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsToMany(PermissionLog, {
        through: AdminPermissionLog,
        foreignKey: "admin_id",
        otherKey: "perm_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(RoleLog, {
        through: RoleAdminLog,
        foreignKey: "admin_id",
        otherKey: "role_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(FlagLog, {
        foreignKey: "approved_by",
        sourceKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.hasMany(PointLog, {
        foreignKey: "approved_by",
        sourceKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(RequestLog, {
        foreignKey: "req_to",
        sourceKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    static createFromAdmin(Admin) {
      return this.create({
        _id: Admin._id,
        admin_id: Admin.admin_id,
      })
    }

    static bulkCreateFromAdmin(Admins) {
      return this.bulkCreate(Admins.map(Admin => ({
        _id: Admin._id,
        admin_id: Admin.admin_id,
      })))
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  AdminLog.init(
    {
      logId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'admins_log',
      initialAutoIncrement: 100,
      modelName: 'AdminLog',
    }
  )
  return AdminLog
}