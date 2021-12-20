const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Point = sequelize.define(
  "point",
  {
    point_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // s_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: "users", key: "s_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    // org_id: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "organizations", key: "org_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    // added_by: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "users", key: "s_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    //   allowNull: true,
    // },
    // approved_by: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "admins", key: "s_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
    status: {
      // status can be P(Pending), A(Approved), D(Denied)
      type: DataTypes.CHAR(1),
      defaultValue: "P",
      allowNull: false,
    },
    visibility: {
      // visibility can be P(Publiv), R(Private)
      type: DataTypes.CHAR(1),
      defaultValue: "P",
      allowNull: false,
    },
    proof_link: {
      type: DataTypes.STRING(255),
    },
  },
  {
    initialAutoIncrement: 100,
    tableName: "points",
    indexes: [{ type: "FULLTEXT", name: "desc_idx", fields: ["description"] }],
  }
);

module.exports = Point;
