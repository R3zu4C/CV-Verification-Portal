'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestLog extends Model {
    static associate({ NotificationLog, UserLog, PointLog, AdminLog }) {

      this.hasMany(NotificationLog, {
        foreignKey: "request_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(UserLog, {
        foreignKey: "req_by",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(PointLog, {
        foreignKey: "point_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(AdminLog, {
        targetKey: "admin_id",
        foreignKey: "req_to",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    static createFromRequest(Request, action) {
      return this.create({
        req_id: Request.req_id,
        req_by: Request.req_by,
        req_to: Request.req_to,
        point_id: Request.point_id,
        approved: Request.approved,
        type: Request.type,
        action: action,
      })
    }

    static bulkCreateFromRequest(Requests, action) {
      return this.bulkCreate(Requests.map(Request => ({
        req_id: Request.req_id,
        req_by: Request.req_by,
        req_to: Request.req_to,
        point_id: Request.point_id,
        approved: Request.approved,
        type: Request.type,
        action: action,
      })))
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  RequestLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      req_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'RequestLog',
      initialAutoIncrement: 100,
      tableName: "requests_log",
      indexes: [{ unique: false, fields: ["req_id"] }],
    }
  );
  return RequestLog;
};
