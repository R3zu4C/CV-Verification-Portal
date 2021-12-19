const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Flag = sequelize.define(
  "flag",
  {
    flag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // point_id: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "points", key: "point_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    // flagged_by: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "users", key: "s_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    // approved_by: {
    //   type: DataTypes.INTEGER,
    //   references: { model: "admins", key: "s_id" },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    status: {
      // status can be P(Pending), A(Approved), D(Denied)
      type: DataTypes.CHAR(1),
      defaultValue: "P",
      allowNull: false,
    },
  },
  {
    tableName: "flags",
  }
);

module.exports = Flag;
