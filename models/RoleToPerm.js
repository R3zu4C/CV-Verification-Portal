const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const RoleToPerm = sequelize.define(
  "role_to_perm",
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "roles", key: "role_id" },
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
    tableName: "role_to_perm",
  }
);

module.exports = RoleToPerm;
