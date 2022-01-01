"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PointLog extends Model {
    static associate({
      FlagLog,
      NotificationLog,
      RequestLog,
      UserLog,
      OrganizationLog,
      AdminLog,
    }) {
      this.hasMany(FlagLog, {
        foreignKey: "point_id",
        sourceKey: "point_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(NotificationLog, {
        foreignKey: "point_id",
        sourceKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(RequestLog, {
        foreignKey: "point_id",
        sourceKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(UserLog, {
        foreignKey: "user_id",
        targetKey: "user_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(OrganizationLog, {
        as: "points",
        foreignKey: "org_id",
        targetKey: "org_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(AdminLog, {
        foreignKey: "approved_by",
        targetKey: "admin_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

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
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      point_id: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: "PointLog",
      initialAutoIncrement: 100,
      tableName: "points_log",
      indexes: [
        { type: "FULLTEXT", name: "desc_idx", fields: ["description"] },
        { unique: false, fields: ["point_id"] },
      ],
    }
  );
  return PointLog;
};
