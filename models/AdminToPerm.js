const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const AdminToPerm = sequelize.define(
  "admin_to_perm",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "admins", key: "s_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    perm_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "permissions", key: "perm_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: "admin_to_perm",
  }
);

module.exports = AdminToPerm;
