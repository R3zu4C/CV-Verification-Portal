const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Admin = require("./Admin");

const User = sequelize.define(
  "user",
  {
    s_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      primaryKey: true,
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
    tableName: "users",
  }
);

module.exports = User;
