const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Organization = sequelize.define(
  "organization",
  {
    org_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    // board_id: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "organizations", key: "org_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
  },
  {
    initialAutoIncrement: 100,
    tableName: "organizations",
  }
);

module.exports = Organization;
