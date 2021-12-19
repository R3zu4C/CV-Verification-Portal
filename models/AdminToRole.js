const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const AdminToRole = sequelize.define(
  "admin_to_role",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "admins", key: "s_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "roles", key: "role_id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: "admin_to_role",
  }
);

module.exports = AdminToRole;
