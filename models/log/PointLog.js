"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointLog extends Model {
    static createFromPoint(Point, action) {
      return this.create({
        point_id: Point.point_id,
        user_id: Point.user_id,
        org_id: Point.org_id,
        approved_by: Point.approved_by,
        status: Point.status,
        description: Point.description,
        title: Point.title,
        category: Point.category,
        start_date: Point.start_date,
        end_date: Point.end_date,
        visibility: Point.visibility,
        proof_link: Point.proof_link,
        added_by: Point.added_by,
        action: action,
      });
    }

    static bulkCreateFromPoint(Points, action) {
      return this.bulkCreate(
        Points.map((Point) => ({
          point_id: Point.point_id,
          user_id: Point.user_id,
          org_id: Point.org_id,
          approved_by: Point.approved_by,
          status: Point.status,
          description: Point.description,
          title: Point.title,
          category: Point.category,
          start_date: Point.start_date,
          end_date: Point.end_date,
          visibility: Point.visibility,
          proof_link: Point.proof_link,
          added_by: Point.added_by,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  PointLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      point_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      status: {
        // status can be P(Pending), A(Approved), D(Denied)
        type: DataTypes.CHAR(1),
        defaultValue: "P",
        allowNull: false,
      },
      visibility: {
        // visibility can be P(Publiv), R(Private)
        type: DataTypes.CHAR(1),
        defaultValue: "P",
        allowNull: false,
      },
      proof_link: {
        type: DataTypes.STRING(255),
      },
      approved_by: {
        type: DataTypes.STRING(50),
      },
      user_id: {
        type: DataTypes.STRING(50),
      },
      added_by: {
        type: DataTypes.STRING(50),
      },
      org_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "PointLog",
      initialAutoIncrement: 100,
      tableName: "points_log",
      indexes: [
        { type: "FULLTEXT", name: "desc_idx", fields: ["description"] },
      ],
    }
  );
  return PointLog;
};
