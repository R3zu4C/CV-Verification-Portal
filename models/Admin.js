const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const User = require("./User");

const Admin = sequelize.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
  },
  {
    tableName: "admins",
  }
);

module.exports = Admin;
