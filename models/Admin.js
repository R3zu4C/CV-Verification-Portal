const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const User = require("./User");

const Admin = sequelize.define(
  "admin",
  {
    s_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "users", key: "s_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: "admins",
  }
);

module.exports = Admin;
