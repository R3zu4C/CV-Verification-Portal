'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate({ Admin, Role , AdminPermission}) {

      this.belongsToMany(Admin, {
        through: AdminPermission,
        foreignKey: "perm_id",
        otherKey: "admin_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(Role, {
        through: "role_permission",
        foreignKey: "perm_id",
        otherKey: "role_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Permission.init(
    {
      perm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: 'Permission',
      initialAutoIncrement: 100,
      tableName: "permissions",
    }
  );
  return Permission;
};
