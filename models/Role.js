const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Role = sequelize.define(
  "role",
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      references: { model: "organizations", key: "org_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    initialAutoIncrement: 100,
    tableName: "roles",
  }
);

module.exports = Role;
