"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RequestLog extends Model {
    static createFromRequest(Request, action) {
      return this.create({
        req_id: Request.req_id,
        req_by: Request.req_by,
        req_to: Request.req_to,
        point_id: Request.point_id,
        approved: Request.approved,
        type: Request.type,
        action: action,
      });
    }

    static bulkCreateFromRequest(Requests, action) {
      return this.bulkCreate(
        Requests.map((Request) => ({
          req_id: Request.req_id,
          req_by: Request.req_by,
          req_to: Request.req_to,
          point_id: Request.point_id,
          approved: Request.approved,
          type: Request.type,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  RequestLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      req_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50),
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      remark: {
        type: DataTypes.TEXT,
      },
      req_by: {
        type: DataTypes.STRING(50),
      },
      req_to: {
        type: DataTypes.STRING(50),
      },
      point_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "RequestLog",
      initialAutoIncrement: 100,
      tableName: "requests_log",
    }
  );
  return RequestLog;
};
