'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {

    static associate({ AdminLog, FlagLog, NotificationLog, RequestLog, PointLog }) {

      this.hasOne(AdminLog, {
        foreignKey: "admin_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(FlagLog, {
        foreignKey: "flagged_by",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.hasMany(NotificationLog, {
        foreignKey: "notif_to",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(RequestLog, {
        foreignKey: "req_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(PointLog, {
        foreignKey: "user_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(PointLog, {
        foreignKey: "added_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }

    static createFromUser(User) {
      return this.create({
        roll_no: User.roll_no,
        name: User.name,
        branch: User.branch,
        user_id: User.user_id,
        mobile_no: User.mobile_no,
        program: User.program,
      })
    }

    static bulkCreateFromUser(Users) {
      return this.bulkCreate(Users.map(User => ({
        roll_no: User.roll_no,
        name: User.name,
        branch: User.branch,
        user_id: User.user_id,
        mobile_no: User.mobile_no,
        program: User.program,
      })))
    }
  }

  UserLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      roll_no: {
        type: DataTypes.STRING(50),
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
      tableName: 'users_log',
      modelName: 'UserLog',
    }
  )
  return UserLog
}