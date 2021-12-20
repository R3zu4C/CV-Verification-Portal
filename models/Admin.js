'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {

    static associate({ User, Permission, Role, Flag, Request, Point }) {

      this.belongsTo(User, {
        foreignKey: "email",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsToMany(Permission, {
        through: "admin_permissions",
        foreignKey: "admin_id",
        otherKey: "perm_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Role, {
        through: "role_admin",
        foreignKey: "admin_id",
        otherKey: "role_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Flag, {
        foreignKey: "approved_by",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      
      this.hasMany(Request, {
        foreignKey: "req_to",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Point, {
        foreignKey: "approved_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Admin.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: 'admins',
      initialAutoIncrement: 100,
      modelName: 'Admin',
    }
  )
  return Admin
}