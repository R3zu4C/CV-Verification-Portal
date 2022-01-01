'use strict';
const { Model } = require('sequelize');
const { RequestLog} = require("./log");
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
        targetKey: "admin_id",
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
      hooks:
      {
        afterCreate: (request, options) => RequestLog.createFromRequest(request),
        afterUpdate: (request, options) => RequestLog.createFromRequest(request),
        beforeDestroy: (request, options) => RequestLog.createFromRequest(request),
        afterBulkCreate: (requests, options) => RequestLog.bulkCreateFromRequest(requests),
        afterBulkUpdate: (requests, options) => RequestLog.bulkCreateFromRequest(requests),
        beforeBulkDestroy: (requests, options) => RequestLog.bulkCreateFromRequest(requests),
      },
      
      sequelize,
      modelName: 'Request',
      initialAutoIncrement: 100,
      tableName: "requests",
    }
  );
  return Request;
};
