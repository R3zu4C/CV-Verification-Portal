"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    toJSON() {
      return { ...this.get(), id: undefined };
    }

    static createFromUser(User, action) {
      return this.create({
        roll_no: User.roll_no,
        name: User.name,
        branch: User.branch,
        user_id: User.user_id,
        mobile_no: User.mobile_no,
        program: User.program,
        action: action,
      });
    }

    static bulkCreateFromUser(Users, action) {
      return this.bulkCreate(
        Users.map((User) => ({
          roll_no: User.roll_no,
          name: User.name,
          branch: User.branch,
          user_id: User.user_id,
          mobile_no: User.mobile_no,
          program: User.program,
          action: action,
        }))
      );
    }
  }

  UserLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
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
      initialAutoIncrement: 100,
      tableName: "users_log",
      modelName: "UserLog",
    }
  );
  return UserLog;
};
