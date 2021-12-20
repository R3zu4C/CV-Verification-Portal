'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ Admin, Permission, Organization }) {
      
      this.belongsTo(Organization, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Permission, {
        through: "role_permission",
        foreignKey: "role_id",
        otherKey: "perm_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Admin, {
        through: "role_admin",
        foreignKey: "role_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Role.init(
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
    },
    {
      sequelize,
      modelName: 'Role',
      initialAutoIncrement: 100,
      tableName: "roles",
    }
  );
  return Role;
};
