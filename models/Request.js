'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate({ Notification, User, Point, Admin }) {

      this.hasMany(Notification, {
        foreignKey: "request_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(User, {
        foreignKey: "req_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Point, {
        foreignKey: "point_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Admin, {
        foreignKey: "req_to",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Request.init(
    {
      req_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(50),
      }, 
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Request',
      initialAutoIncrement: 100,
      tableName: "requests",
    }
  );
  return Request;
};
