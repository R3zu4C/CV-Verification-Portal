'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Admin, Flag, Notification, Request, Point }) {

      this.hasOne(Admin, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(Flag, {
        foreignKey: "flagged_by",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.hasMany(Notification, {
        foreignKey: "notif_to",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Request, {
        foreignKey: "req_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Point, {
        foreignKey: "user_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Point, {
        foreignKey: "added_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
      roll_no: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.INTEGER,
      },
      branch: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      program: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}