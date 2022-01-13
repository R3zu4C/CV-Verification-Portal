"use strict";
const { Model } = require("sequelize");
const { PointLog } = require("./log");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate({
      Flag,
      Notification,
      Request,
      User,
      Organization,
      Admin,
    }) {
      this.hasMany(Flag, {
        foreignKey: "point_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(Notification, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.hasMany(Request, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "User",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(User, {
        foreignKey: "added_id",
        as: "AddedBy",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Organization, {
        foreignKey: "org_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Admin, {
        foreignKey: "approved_by",
        targetKey: "admin_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Point.init(
    {
      point_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      hooks: {
        afterCreate: (point, options) => PointLog.createFromPoint(point, "C"),
        afterUpdate: (point, options) => PointLog.createFromPoint(point, "U"),
        beforeDestroy: (point, options) => PointLog.createFromPoint(point, "D"),
        afterBulkCreate: (points, options) => PointLog.bulkCreateFromPoint(points, "C"),
        afterBulkUpdate: (points, options) => PointLog.bulkCreateFromPoint(points, "U"),
        beforeBulkDestroy: (points, options) => PointLog.bulkCreateFromPoint(points, "D"),
      },

      sequelize,
      modelName: "Point",
      initialAutoIncrement: 100,
      tableName: "points",
      indexes: [
        { type: "FULLTEXT", name: "desc_idx", fields: ["description"] },
      ],
    }
  );
  return Point;
};
